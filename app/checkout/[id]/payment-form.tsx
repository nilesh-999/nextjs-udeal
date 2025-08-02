'use client'


import { RazorpayScriptProvider, useRazorpayScriptReducer } from '@/razorpay-modules/razorSP'
import RazorpayButton from '@/razorpay-modules/razorB'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import {
  approveRazorPayOrder,
  createRazorPayOrder,
} from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/db/model.order.model'
import { formatDateTime } from '@/lib/utils'

import CheckoutFooter from '../checkout-footer'
import { redirect, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ProductPrice from '@/components/shared/product/product-price'
import RazorpayLoadingState from '@/razorpay-modules/razorL'

export default function OrderDetailsForm({
  order,
  razorpayClientId,
}: {
  order: IOrder
  razorpayClientId: string
  isAdmin: boolean
  
}) {
  const router = useRouter()
  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    expectedDeliveryDate,
    isPaid,
  } = order
  const { toast } = useToast()

  if (isPaid) {
    redirect(`/account/orders/${order._id}`)
  }
  // function RazorpayLoadingState() {
  //   const { isLoaded, isLoading, error, loadScript } = useRazorpayScriptReducer()
  //   let status = ''
  //   if (isLoaded) {
  //     status = 'RazorPay is loaded.'
      
  //   } else if (isLoading) {
  //     status = 'RazorPay is loading...'
      
  //   }
  //   else if (error) {
  //     status = `RazorPay failed to load`
  //   return status
  // }
  const handleCreateRazorPayOrder = async () => {
    const res = await createRazorPayOrder(order._id)
    if (!res.success)
      return toast({
        description: res.message,
        variant: 'destructive',
      })  
    return {id:res.data}
  }
  const handleApproveRazorPayOrder = async (data: { orderID: string }) => {
    const res = await approveRazorPayOrder(order._id, data)
    toast({
      description: res.message,
      variant: res.success ? 'default' : 'destructive',
    })
  }

  const CheckoutSummary = () => (
    <Card>
      <CardContent className='p-4'>
        <div>
          <div className='text-lg font-bold'>Order Summary</div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Items:</span>
              <span>
                {' '}
                <ProductPrice price={itemsPrice} plain />
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping & Handling:</span>
              <span>
                {shippingPrice === undefined ? (
                  '--'
                ) : shippingPrice === 0 ? (
                  'FREE'
                ) : (
                  <ProductPrice price={shippingPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between'>
              <span> Tax:</span>
              <span>
                {taxPrice === undefined ? (
                  '--'
                ) : (
                  <ProductPrice price={taxPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between  pt-1 font-bold text-lg'>
              <span> Order Total:</span>
              <span>
                {' '}
                <ProductPrice price={totalPrice} plain />
              </span>
            </div>

            {!isPaid && paymentMethod === 'RazorPay' && (
              <div>
                <RazorpayScriptProvider >
                  <RazorpayLoadingState />
                  <RazorpayButton
                    createOrder={handleCreateRazorPayOrder}
                    onApprove={handleApproveRazorPayOrder}
                    razorpayKey={razorpayClientId}
                  />
                </RazorpayScriptProvider>
              </div>
            )}
            

            {!isPaid && paymentMethod === 'Cash On Delivery' && (
              <Button
                className='w-full rounded-full'
                onClick={() => router.push(`/account/orders/${order._id}`)}
              >
                View Order
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className='max-w-6xl mx-auto'>
      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-3'>
          {/* Shipping Address */}
          <div>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-lg font-bold'>
                <span>Shipping Address</span>
              </div>
              <div className='col-span-2'>
                <p>
                  {shippingAddress.fullName} <br />
                  {shippingAddress.street} <br />
                  {`${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                </p>
              </div>
            </div>
          </div>

          {/* payment method */}
          <div className='border-y'>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-lg font-bold'>
                <span>Payment Method</span>
              </div>
              <div className='col-span-2'>
                <p>{paymentMethod}</p>
              </div>
            </div>
          </div>

          <div className='grid md:grid-cols-3 my-3 pb-3'>
            <div className='flex text-lg font-bold'>
              <span>Items and shipping</span>
            </div>
            <div className='col-span-2'>
              <p>
                Delivery date:
                {formatDateTime(expectedDeliveryDate).dateOnly}
              </p>
              <ul>
                {items.map((item) => (
                  <li key={item.slug}>
                    {item.name} x {item.quantity} = {item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='block md:hidden'>
            <CheckoutSummary />
          </div>

          <CheckoutFooter />
        </div>
        <div className='hidden md:block'>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  )
}
