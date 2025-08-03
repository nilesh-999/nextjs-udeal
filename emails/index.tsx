import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/models/order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'
//import User from '@/lib/db/models/user.model';


if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}
console.log('Using Resend API Key:', process.env.NEXT_PUBLIC_RESEND_API_KEY);

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  //console.log('Sending purchase receipt for order:', (User.findById(order.user)));
  await resend.emails.send({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: 'nilesh.23a@gmail.com',
    subject: 'Order Confirmation',
    react: <PurchaseReceiptEmail order={order} />,
  })
}

