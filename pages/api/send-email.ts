import type { NextApiRequest, NextApiResponse } from 'next';
import { sendPurchaseReceipt } from '@/emails';
import { connectToDatabase } from '@/lib/db';
import Order from '@/lib/db/models/order.model';

type ResponseData = {
  success?: boolean;
  message?: string;
  error?: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the request body
    const { orderId } = req.body;
    
    console.log('Received request to send email for order:', orderId);
    
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Try to get the order details from the database and populate the user field
    let order = await Order.findById(orderId).populate('user');
    
    // Check if order exists
    if (!order) {
      // For development/testing environment, create a mock order
      if (process.env.NODE_ENV === 'development') {
        console.log('Order not found, creating a mock order for testing');
        
        // Create a mock order for testing
        order = {
          _id: orderId,
          user: {
            _id: 'mock-user-id',
            email: 'nilesh.23a@gmail.com',
            name: 'Test User'
          },
          items: [
            {
              product: 'mock-product-id',
              clientId: 'mock-client-id',
              name: 'Test Product',
              slug: 'test-product',
              image: '/images/1.png',
              category: 'Test Category',
              price: 99.99,
              countInStock: 10,
              quantity: 1
            }
          ],
          shippingAddress: {
            fullName: 'Test User',
            street: '123 Test Street',
            city: 'Test City',
            postalCode: '12345',
            country: 'Test Country',
            state: 'Test State',
            phone: '1234567890'
          },
          paymentMethod: 'Test Payment',
          itemsPrice: 99.99,
          shippingPrice: 10.00,
          taxPrice: 5.00,
          totalPrice: 114.99,
          isPaid: true,
          paidAt: new Date(),
          expectedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        } as any;
      } else {
        // In production, return a 404 error
        return res.status(404).json({ error: 'Order not found' });
      }
    } else {
      console.log('Found order:', order._id.toString());
      
      // Check if user field is populated
      if (order.user && typeof order.user === 'object' && 'email' in order.user) {
        console.log('User email:', order.user.email);
      } else {
        console.warn('User field is not properly populated');
      }
    }
    
    // Send the email
    await sendPurchaseReceipt({ order });
    
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: (error as Error).message
    });
  }
}