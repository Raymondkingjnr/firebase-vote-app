import { useFlutterwave } from "flutterwave-react-v3";
import React from "react";

export const PaymentConfig = ({ formData, handlePaymentCallback }) => {
  const config = {
    public_key: "FLWPUBK_TEST-8cb54c76502ce534e33756e2ec17c219-X",
    tx_ref: Date.now(),
    amount: 50 * formData.No_votes,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: formData.email,
      phone_number: formData.phoneNumber,
      name: formData.name,
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      onClick={() => {
        handleFlutterPayment({
          callback: handlePaymentCallback,
        });
      }}
    >
      Testing FW Payment
    </button>
  );
};
