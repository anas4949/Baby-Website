import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

import Image2 from "../assets/sale/img2.jpeg";
import Image3 from "../assets/sale/img3.jpeg";
import Image4 from "../assets/sale/img4.jpeg";
import Image5 from "../assets/sale/img5.jpeg";
import Image6 from "../assets/sale/img6.jpeg";
import Image7 from "../assets/sale/img7.jpeg";
import Image8 from "../assets/sale/img8.jpeg";
import Image9 from "../assets/sale/img9.jpeg";
import Image10 from "../assets/sale/img10.jpeg";
import Image11 from "../assets/sale/img11.jpeg";

const products = [
  {
    id: 1,
    img1: Image3,
    img2: Image2,
    title:
      "Sunnozy All Weather Pack Of 3 Footed Rompers (0-6M) | Soft Cotton Sleepsuits",
    price: 2500,
    isDress: true,
    description:
      "Soft and comfortable rompers for babies made from 100% breathable cotton. Perfect for everyday wear.",
  },
  {
    id: 2,
    img1: Image4,
    img2: Image7,
    title: "Winter Woolen Baby Hooded Rompers | Ultra-Soft Knit Jumpsuit",
    price: 2500,
    isDress: true,
    description:
      "Keep your baby warm and cozy in this premium woolen hooded romper, perfect for winter.",
  },
  {
    id: 3,
    img1: Image5,
    img2: Image6,
    title: "Unisex Cow Print Hooded Rompers | Plush Animal Onesie",
    price: 2500,
    isDress: true,
    description:
      "Cute and cozy cow-print hooded romper for your little one. Made from plush soft material.",
  },
  {
    id: 4,
    img1: Image8,
    img2: Image9,
    title:
      "Lovevook Multi-functional 3 in 1 Foldable Changing Baby Bed Crib Diaper Bag Backpack",
    price: 2500,
    isDress: false,
    description:
      "Smart and stylish 3-in-1 diaper bag that doubles as a baby bed and changing station.",
  },
  {
    id: 5,
    img1: Image10,
    img2: Image11,
    title: "Hudson Baby Animal Face Hooded Towels | 30x30 Terry Cotton | Lion",
    price: 2500,
    isDress: false,
    description:
      "Soft and absorbent terry cotton hooded towel with an adorable lion face design.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));
  const { addToCart } = useCart();

  const [selectedImg, setSelectedImg] = useState(product?.img1);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("0-3M");

  if (!product)
    return <p className="text-center mt-10 text-pink-600">Product not found!</p>;

  const handleAddToCart = () => {
    if (product.isDress && !size) {
      toast.warning(" Please select a size first!");
      return;
    }

    addToCart(product, quantity, product.isDress ? size : null);
    toast.success(" Added to cart successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="container mx-auto flex flex-col md:flex-row gap-10 items-center">
       
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
          <img
            src={selectedImg}
            alt={product.title}
            className="w-[350px] md:w-[450px] h-[450px] object-cover rounded-2xl shadow-lg"
          />
          <div className="flex gap-3">
            {[product.img1, product.img2].map(
              (img, i) =>
                img && (
                  <img
                    key={i}
                    src={img}
                    alt="thumbnail"
                    onClick={() => setSelectedImg(img)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                      selectedImg === img
                        ? "border-pink-500"
                        : "border-transparent"
                    }`}
                  />
                )
            )}
          </div>
        </div>

        
        <div className="w-full md:w-1/2 space-y-5">
          <h1 className="text-3xl font-semibold text-gray-800">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <h2 className="text-2xl font-bold text-pink-600">Rs. {product.price}</h2>

          {product.isDress && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-pink-700 mb-1">
                Select Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border border-pink-400 rounded-lg px-3 py-2 text-sm text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50"
              >
                <option value="0-3M">0-3 Months</option>
                <option value="3-6M">3-6 Months</option>
                <option value="6-12M">6-12 Months</option>
                <option value="12-18M">12-18 Months</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="bg-pink-500 text-white text-lg font-bold px-3 py-1 rounded-full hover:bg-pink-600 transition"
            >
              -
            </button>
            <span className="text-lg font-semibold text-pink-700">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-pink-500 text-white text-lg font-bold px-3 py-1 rounded-full hover:bg-pink-600 transition"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-5 w-full bg-pink-600 text-white py-3 rounded-lg shadow hover:bg-pink-700 transition"
          >
            ADD TO CART
          </button>

          <Link
            to="/sale"
            className="block text-center text-pink-500 mt-3 hover:scale-105 transition-all cursor-pointer duration-300"
          >
            ← Back to Sale
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
