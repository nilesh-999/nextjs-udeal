import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/models/order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'
import { IUser } from '@/lib/db/models/user.model'

// Check for API key in server-side environment variables


// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY as string);


/**
 * Sends a purchase receipt email to the user
 * @param order - The order object with populated user field
 */
export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  try {
    console.log('Sending purchase receipt for order:', order._id, `${SENDER_NAME} <${SENDER_EMAIL}>`);
    console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Set' : 'Not Set');
    console.log('SENDER_EMAIL:', SENDER_EMAIL);
    console.log('SENDER_NAME:', SENDER_NAME);
    
    // Use the Resend instance to send email (server-side only)
    //minor-if (typeof window === 'undefined') {
      // Get the user email from the populated user field
      let userEmail = 'l'; // Default fallback email
      
      // Check if user field is populated and has email property
      
        if (typeof order.user === 'object' && 'email' in order.user) {
          // User is populated, use the email from the user object
          userEmail = (order.user as IUser).email;
          console.log('User email:', userEmail)
        } else if (typeof order.user === 'string') {
          // User is not populated, log a warning
          console.warn('User field is not populated. Using fallback email.');
        }
      
      
      console.log('Sending email to:', userEmail);
      
      await resend.emails.send({
        from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
        to: userEmail,
        subject: 'Order Confirmation',
        react: <PurchaseReceiptEmail order={order} />,
      });
      console.log('Email sent successfully');
    // } else {
    //   // If running on client-side, call the API route instead
    //   // const response = await fetch('/api/send-email', {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: JSON.stringify({ orderId: order._id }),
    //   // });
      
    //   // if (!response.ok) {
    //   //   throw new Error('Failed to send email through API route');
    //   // }
      
    //   console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
    // }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

