'use server'

import { Cart, OrderItem, ShippingAddress } from '@/types'
import { formatError, round2 } from '../utils'
import { AVAILABLE_DELIVERY_DATES } from '../constants'
import { connectToDatabase } from '../db'
import { auth } from '@/auth'
import { OrderInputSchema } from '../validator'
import Order, { IOrder } from '../db/model.order.model'
import { razorpay } from '../razorpay'
import { sendPurchaseReceipt } from '@/emails'
import { revalidatePath } from 'next/cache'

export const createOrder = async (clientSideCart: Cart) => {
  try {
    await connectToDatabase()
    const session = await auth()
    if (!session) throw new Error('User not authenticated')
    // recalculate price and delivery date on the server
    const createdOrder = await createOrderFromCart(
      clientSideCart,
      session.user.id!
    )
    return {
      success: true,
      message: 'Order placed successfully',
      data: { orderId: createdOrder._id.toString() },
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
export const createOrderFromCart = async (
  clientSideCart: Cart,
  userId: string
) => {
  const cart = {
    ...clientSideCart,
    ...calcDeliveryDateAndPrice({
      items: clientSideCart.items,
      shippingAddress: clientSideCart.shippingAddress,
      deliveryDateIndex: clientSideCart.deliveryDateIndex,
    }),
  }

  const order = OrderInputSchema.parse({
    user: userId,
    items: cart.items,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
    expectedDeliveryDate: cart.expectedDeliveryDate,
  })
  return await Order.create(order)
}

export async function getOrderById(orderId: string): Promise<IOrder> {
  await connectToDatabase()
  const order = await Order.findById(orderId)
  return JSON.parse(JSON.stringify(order))
}
export async function createRazorPayOrder(orderId: string) {
  await connectToDatabase()
  try {
    const order = await Order.findById(orderId)
    if (order) {
      const razorpayOrder = await razorpay.createOrder(order.totalPrice)
      order.paymentResult = {
        id: razorpayOrder.id,
        email_address: '',
        status: '',
        pricePaid: '0',
      }
      await order.save()
      return {
        success: true,
        message: 'RazorPay order created successfully',
        data: razorpayOrder.id,
      }
    } else {
      throw new Error('Order not found')
    }
  } catch (err) {
    return { success: false, message: formatError(err) }
  }
}

export async function approveRazorPayOrder(
  orderId: string,
  data: { orderID: string }
) {
  await connectToDatabase()
  try {
    // Fetch order with populated user field
    const order = await Order.findById(orderId).populate('user', [
      'email',
      'name',
    ])
    if (!order) throw new Error('Order not found')

    // Check if order is already paid
    if (order.isPaid) {
      return {
        success: true,
        message: 'Order is already paid',
        alreadyPaid: true,
      }
    }

    console.log('Attempting to capture payment:', data.orderID)
    const captureData = await razorpay.capturePayment(
      data.orderID,
      order.totalPrice
    )

    if (!captureData || captureData.status !== 'captured') {
      console.error('Payment capture failed:', captureData)
      throw new Error('Error in razorpay payment')
    }

    // Update order status
    order.isPaid = true
    order.paidAt = new Date()
    order.paymentResult = {
      id: captureData.id,
      status: captureData.status,
      email_address: order.user.email, // Use populated user email
      pricePaid: (captureData.amount / 100).toString(),
    }

    // Save order first
    await order.save()

    try {
      // Add logging for email sending
      console.log('Attempting to send email to:', order.user.email)
      await sendPurchaseReceipt({ order })
      console.log('Email sent successfully')
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't throw error here, just log it
    }

    // Revalidate the page
    revalidatePath(`/account/orders/${orderId}`)

    return { success: true, message: 'Payment successful' }
  } catch (err: any) {
    console.error('Payment approval error:', err)
    if (err.message?.includes('already been captured')) {
      return {
        success: true,
        message: 'Payment was already processed',
        alreadyPaid: true,
      }
    }
    return { success: false, message: formatError(err) }
  }
}

export const calcDeliveryDateAndPrice = async ({
  items,
  shippingAddress,
  deliveryDateIndex,
}: {
  deliveryDateIndex?: number
  items: OrderItem[]
  shippingAddress?: ShippingAddress
}) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )
  const deliveryDate =
    AVAILABLE_DELIVERY_DATES[
      deliveryDateIndex === undefined
        ? AVAILABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex
    ]

  const shippingPrice =
    !shippingAddress || !deliveryDate
      ? undefined
      : deliveryDate.freeShippingMinPrice > 0 &&
          itemsPrice >= deliveryDate.freeShippingMinPrice
        ? 0
        : deliveryDate.shippingPrice

  const taxPrice = !shippingAddress ? undefined : round2(itemsPrice * 0.15)
  const totalPrice = round2(
    itemsPrice +
      (shippingPrice ? round2(shippingPrice) : 0) +
      (taxPrice ? round2(taxPrice) : 0)
  )
  return {
    AVAILABLE_DELIVERY_DATES,
    deliverDateIndex:
      deliveryDateIndex === undefined
        ? AVAILABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  }
}
