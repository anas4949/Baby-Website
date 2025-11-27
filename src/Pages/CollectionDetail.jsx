import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const CollectionDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { addToCart } = useCart();

  if (!state || !state.product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Product not found
      </div>
    );
  }

  const { product, category } = state;

  const sizeOptions =
    category === "Baby Suits" ||
    (category === "Best Seller" && product.title.includes("Suit")) ||
    (category === "New Arrivals" && product.title.includes("Suit"))
      ? ["0-3M", "3-6M", "6-9M", "9-12M"]
      : category === "Caps" ||
        (category === "New Arrivals" && product.title.includes("Cap"))
      ? ["Small", "Medium", "Large"]
      : [];

  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (sizeOptions.length > 0 && !size) {
      toast.warning(" Please select a size before adding to cart!");
      return;
    }

    const productToAdd = {
      id: `${id}-${size || "no-size"}`,
      name: product.title,
      price: product.price,
      image: product.img,
      quantity,
      size: size || null,
    };

    addToCart(productToAdd);
    setQuantity(1);
    setSize("");

    toast.success("Added to cart successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-center">
       
        <div>
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
          />
        </div>

      
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-500 mt-1">{category}</p>

          <p className="text-pink-600 text-2xl font-semibold mt-3">
            Rs {product.price}
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">{product.desc}</p>

          
          {sizeOptions.length > 0 && (
            <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-1">
                Select Size:
              </label>
              <div className="flex gap-2">
                {sizeOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 border rounded-md transition ${
                      size === s
                        ? "bg-pink-600 text-white border-pink-600"
                        : "border-gray-300 text-gray-700 hover:border-pink-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-1">
              Quantity:
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200"
              >
                –
              </button>
              <span className="font-semibold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-1 bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-8 w-full md:w-auto bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Product Details
        </h2>
        <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-2">
          <li>Category: {category}</li>
          <li>High-quality materials used for durability and comfort.</li>
          <li>Perfect gift for newborns and infants.</li>
          <li>Machine washable and easy to maintain.</li>
        </ul>
      </div>
    </div>
  );
};

export default CollectionDetail;
