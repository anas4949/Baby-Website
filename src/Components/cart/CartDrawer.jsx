import React from "react";
import { useCart } from "../../Context/CartContext";
import { FaTimes, FaTrash } from "react-icons/fa";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, getTotal } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg flex flex-col">
        
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty 🛒</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border-b pb-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700">{item.name}</h3>
                  {item.size && (
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  )}
                  <p className="text-pink-600 font-medium">Rs {item.price}</p>

                  
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQuantity(item.id, item.size)}
                      className="px-2 py-1 bg-pink-100 text-pink-600 rounded hover:bg-pink-200"
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id, item.size)}
                      className="px-2 py-1 bg-pink-100 text-pink-600 rounded hover:bg-pink-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        
        <div className="border-t p-4">
          <p className="flex justify-between font-semibold text-gray-700">
            <span>Total:</span>
            <span>Rs {getTotal()}</span>
          </p>
          <button
            onClick={() => {
              onClose();
              window.location.href = "/checkout";
            }}
            className="mt-4 w-full bg-pink-600 text-white font-semibold py-2 rounded-lg hover:bg-pink-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
