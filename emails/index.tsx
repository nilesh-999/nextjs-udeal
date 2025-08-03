import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/models/order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'
//import User from '@/lib/db/models/user.model';

// Check for API key in server-side environment variables
if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not defined in environment variables');
}

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY || '');


export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  try {
    console.log('Sending purchase receipt for order:', order._id, `${SENDER_NAME} <${SENDER_EMAIL}>`);
    
    // Use the Resend instance to send email (server-side only)
    if (typeof window === 'undefined') {
      await resend.emails.send({
        from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
        to: 'nilesh.23a@gmail.com', // Replace with order.user.email when available
        subject: 'Order Confirmation',
        react: <PurchaseReceiptEmail order={order} />,
      });
      console.log('Email sent successfully');
    } else {
      // If running on client-side, call the API route instead
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: order._id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email through API route');
      }
      
      console.log('Email request sent through API route');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

