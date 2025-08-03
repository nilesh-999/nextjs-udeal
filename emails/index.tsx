import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/model.order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'
import User from '@/lib/db/models/user.model';

if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}
console.log('Using Resend API Key:', process.env.NEXT_PUBLIC_RESEND_API_KEY);

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  try {
    console.log(order);
     const user = await User.findById(order.user);
  console.log(user);
     const userEmail = typeof order.user === 'string'
       ? order.user
       : order.user.email;
    console.log('User email:', userEmail);
    console.log('Attempting to send email with details:', {
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: userEmail,
      subject: 'Order Confirmation'
    });

    const response = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: (order.user as { email: string }).email,
      subject: 'Order Confirmation',
      react: <PurchaseReceiptEmail order={order} />,
    });

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

