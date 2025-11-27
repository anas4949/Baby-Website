import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Import toast
import "react-toastify/dist/ReactToastify.css"; // 👈 Required

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!name || !address || !paymentMethod) {
      toast.error(" Please fill all details and select a payment method.", {
        position: "top-right",
      });
      return;
    }

    
    clearCart();
    toast.success(" Order placed successfully!", {
      position: "top-right",
    });

    setTimeout(() => {
      navigate("/order-success");
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">🛒 Your cart is empty!</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl p-8">
       
        <div>
          <h2 className="text-2xl font-bold text-pink-600 mb-4">🧾 Order Summary</h2>

          <div className="divide-y">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                    {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-pink-600 font-semibold">
                  Rs {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <p className="text-right font-bold text-lg mt-4 text-pink-600">
            Total: Rs {getTotal()}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-pink-600 mb-4">🏠 Shipping Details</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500"
            />

            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500"
              rows="3"
            />

            <h3 className="text-lg font-semibold text-gray-700 mt-6">
              Payment Method:
            </h3>
            <div className="space-y-3 mt-2">
              {["JazzCash", "Debit / Credit Card", "Cash on Delivery"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-3 p-2 border rounded-lg cursor-pointer transition ${
                    paymentMethod === method
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300 hover:border-pink-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
