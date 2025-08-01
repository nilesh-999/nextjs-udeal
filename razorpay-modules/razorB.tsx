import React from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};

type RazorpayButtonProps = {
  createOrder: () => Promise<{ id: string }>; // backend order creation
  onApprove: (data: { orderID: string }) => Promise<void>; // backend approval
  name?: string;
  email?: string;
  amount?: number;
  currency?: string;
};

const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  createOrder,
  onApprove,
  name = 'John Doe',
  email = 'john@example.com',
  amount,
  currency = 'INR',
}) => {
  const loadScript = () =>
    new Promise<void>((resolve) => {
      if (window.Razorpay) return resolve();
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    await loadScript();

    const orderData = await createOrder();

    if (!orderData?.id) {
      alert('Failed to create order');
      return;
    }

    const options = {
      key: 'your_key_id', // Replace with your Razorpay key
      order_id: orderData.id,
      name: 'Your Company',
      description: 'Payment for order',
      handler: async (response: RazorpayPaymentResponse) => {
        try {
          // Call your backend to approve the payment
          await onApprove({ orderID: response.razorpay_payment_id });
          alert('Payment successful and approved!');
        } catch (error) {
          alert('Payment succeeded but approval failed');
          console.error(error);
        }
      },
      prefill: {
        name,
        email,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default RazorpayButton;
