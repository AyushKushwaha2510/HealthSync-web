'use client'

import { useState } from "react";
import { createOrderApi, verifySignatureApi } from "../api/payment.api";
import { CreateOrder } from "../types/payment.type";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useStartPayment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const startPayment = async (data: CreateOrder) => {
    try {
      setLoading(true);
      setError(null);

      // Create Order
      const orderRes = await createOrderApi(data);
      const orderData = orderRes.data;

      // Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,

        handler: async (response: any) => {
          // Verify payment
          const res = {
            externalOrderId: response.razorpay_order_id,
            externalPaymentId: response.razorpay_payment_id,
            externalSignature: response.razorpay_signature,
          }

          await verifySignatureApi(res)

        },
      };

      console.log("open razorpay", window.Razorpay);
      const razor = new window.Razorpay(options);
      razor.open();
    }
    catch (error: any) {
      setSuccess(null);
      setError(
        error.response?.data?.message ||
        'Failed to Process Payment Request'
      );
    }
    finally {
      setLoading(false);
    }
  }

  return { startPayment, loading, success, error };
}