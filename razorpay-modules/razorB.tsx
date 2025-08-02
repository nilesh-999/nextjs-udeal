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
  onApprove: (data: { orderID: string }) => Promise<void>;
  razorpayKey: string; // backend approval
  name?: string;
  email?: string;
  amount?: number;
  currency?: string;
};

const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  createOrder,
  onApprove,
  razorpayKey,
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
    try {
      await loadScript();
      const orderData = await createOrder();

      console.log('Using Razorpay key:', razorpayKey); // Add this log

      if (!orderData?.id) {
        console.error('Failed to create order:', orderData);
        alert('Failed to create order');
        return;
      }

      const options = {
        key: razorpayKey,
        order_id: orderData.id,
        handler: async function (response: RazorpayPaymentResponse) {
          console.log('Payment response:', response);
          if (!response.razorpay_payment_id) {
            alert('Payment failed: Missing payment ID');
            return;
          }
          try {
            await onApprove({ orderID: response.razorpay_payment_id });
            // Remove the alert here since we're handling success in the parent
          } catch (error) {
            console.error('Payment approval failed:', error);
            alert('Payment succeeded but approval failed');
          }
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal closed');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
        },
        theme: {
          color: '#F37254',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Failed to initialize payment');
    }
  };

  return (
    <button onClick={handlePayment} className="w-full">
      Pay Now
    </button>
  );
};

export default RazorpayButton;
