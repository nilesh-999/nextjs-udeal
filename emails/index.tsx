import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/model.order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  try {
    const userEmail = typeof order.user === 'string'
      ? order.user
      : order.user.email;

    console.log('Sending email with details:', {
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: userEmail,
      subject: 'Order Confirmation'
    });

    const response = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: userEmail,
      subject: 'Order Confirmation',
      react: <PurchaseReceiptEmail order={order} />,
    });

    console.log('Email sent response:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

