import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/model.order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'

//if (!process.env.RESEND_API_KEY) {
  //throw new Error('RESEND_API_KEY is not defined in environment variables');
//}

const resend = new Resend("re_W16AUAmN_3tYPds5KuKz9KUwwpFRNB4PQ");

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  try {
    const userEmail = typeof order.user === 'string'
      ? order.user
      : order.user.email;

    console.log('Attempting to send email with details:', {
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

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

