import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg text-gray-700 max-w-md mb-6">
        Thank you for your purchase. Your order has been received and is now being processed.
        We’ll notify you once it ships.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-all"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
