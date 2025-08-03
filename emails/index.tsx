import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/model.order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'


if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}
console.log('Using Resend API Key:', process.env.NEXT_PUBLIC_RESEND_API_KEY);

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  await resend.emails.send({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: (order.user as { email: string }).email,
    subject: 'Order Confirmation',
    react: <PurchaseReceiptEmail order={order} />,
  })
}

