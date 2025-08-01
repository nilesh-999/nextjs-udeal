import React from 'react';
import { useRazorpayScriptReducer } from './razorSP';

const RazorpayLoadingState = () => {
  const { isLoading, error } = useRazorpayScriptReducer();

  if (isLoading) return <p>Loading Razorpay SDK…</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  return null;
};

export default RazorpayLoadingState;
