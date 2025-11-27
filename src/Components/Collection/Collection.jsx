import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 



import Image1 from "../../assets/collection/blanket.webp";
import Image2 from "../../assets/collection/bags.webp";
import Image3 from "../../assets/collection/bestseller.webp";
import Image4 from "../../assets/collection/babysuits.jpeg";
import Image5 from "../../assets/collection/caps.jpg";
import Image6 from "../../assets/collection/new arrivals.webp";

import Img1 from "../../assets/exploremore/babysuit1.jpeg";
import Img2 from "../../assets/exploremore/babysuit2.jpeg";
import Img3 from "../../assets/exploremore/babysuit3.jpg";
import Img4 from "../../assets/exploremore/babysuit4.jpg";

import Img5 from "../../assets/exploremore/bestseller1.jpg";
import Img6 from "../../assets/exploremore/bestseller2.jpg";
import Img7 from "../../assets/exploremore/bestseller3.jpg";
import Img8 from "../../assets/exploremore/bestseller4.jpg";

import Img9 from "../../assets/exploremore/blanket1.jpg";
import Img10 from "../../assets/exploremore/blanket2.jpeg";
import Img11 from "../../assets/exploremore/blanket3.png";
import Img12 from "../../assets/exploremore/blanket4.jpeg";

import Img13 from "../../assets/exploremore/cap1.jpg";
import Img14 from "../../assets/exploremore/cap2.jpeg";
import Img15 from "../../assets/exploremore/cap3.jpg";
import Img16 from "../../assets/exploremore/cap4.jpeg";

import Img17 from "../../assets/exploremore/diaperbag1.jpeg";
import Img18 from "../../assets/exploremore/diaperbag2.jpeg";
import Img19 from "../../assets/exploremore/diaperbag3.jpg";
import Img20 from "../../assets/exploremore/diaperbag4.jpeg";

import Img21 from "../../assets/exploremore/newarrival1.jpeg";
import Img22 from "../../assets/exploremore/newarrival2.jpg";
import Img23 from "../../assets/exploremore/newarrival3.jpeg";
import Img24 from "../../assets/exploremore/newarrival4.jpeg";

// ---------------- Product Card ----------------
const ProductCard = ({ item, category, id }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const { addToCart } = useCart();

  const sizeOptions =
    category === "Baby Suits" ||
    (category === "Best Seller" && item.title.includes("Suit")) ||
    (category === "New Arrivals" && item.title.includes("Suit"))
      ? ["0-3M", "3-6M", "6-9M", "9-12M"]
      : category === "Caps" ||
        (category === "New Arrivals" && item.title.includes("Cap"))
      ? ["Small", "Medium", "Large"]
      : [];

  const handleAddToCart = () => {
  if (sizeOptions.length > 0 && !size) {
    toast.error("Please select a size before adding to cart!");
    return;
  }

  const productToAdd = {
    id: `${id}-${size || "no-size"}`,
    name: item.title,
    price: item.price,
    image: item.img,
    quantity: quantity,
    size: size || null,
  };

  addToCart(productToAdd);
  setQuantity(1);
  setSize("");
  toast.success("🛒 Added to cart!");
};


  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden border border-pink-200 group">
      
      <Link
        to={`/collection/${id}`}
        state={{ product: item, category }}
      >
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
        />
      </Link>

      <div className="p-3 text-center">
        <Link
          to={`/collection/${id}`}
          state={{ product: item, category }}
        >
          <h3 className="font-semibold text-gray-700 line-clamp-1 hover:text-pink-600 transition">
            {item.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 line-clamp-2">{item.desc}</p>
        <p className="font-bold text-pink-600 mt-2">Rs {item.price}</p>

        <div className="mt-3 space-y-2">
          <button className="w-full bg-pink-100 text-pink-400 font-semibold px-4 py-2 rounded-lg shadow cursor-not-allowed group-hover:hidden">
            Add to Cart
          </button>

          <div className="hidden group-hover:block space-y-2">
            {sizeOptions.length > 0 && (
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border border-pink-300 rounded-md p-1 text-sm focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">Select Size</option>
                {sizeOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200"
              >
                –
              </button>
              <span className="font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-1 bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-pink-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Collection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const slides = [
    { id: 1, title: "Blankets", img: Image1 },
    { id: 2, title: "Diaper Bags", img: Image2 },
    { id: 3, title: "Best Seller", img: Image3 },
    { id: 4, title: "Baby Suits", img: Image4 },
    { id: 5, title: "Caps", img: Image5 },
    { id: 6, title: "New Arrivals", img: Image6 },
  ];

  const items = {
    "Baby Suits": [
      { id: 1, img: Img1, title: "Cotton Baby Suit", desc: "Soft cotton suit for 0-6M", price: 1200 },
      { id: 2, img: Img2, title: "Winter Baby Suit", desc: "Cozy warm material", price: 1500 },
      { id: 3, img: Img3, title: "Printed Baby Suit", desc: "Cute cartoon print", price: 1100 },
      { id: 4, img: Img4, title: "Full Sleeve Suit", desc: "Ideal for winters", price: 1400 },
    ],
    "Best Seller": [
      { id: 5, img: Img5, title: "Best Seller Suit", desc: "Most loved baby suit", price: 2000 },
      { id: 6, img: Img6, title: "Best Seller Blanket", desc: "Top rated blanket", price: 2300 },
      { id: 7, img: Img7, title: "Best Seller Cap", desc: "Popular stylish cap", price: 700 },
      { id: 8, img: Img8, title: "Best Seller Bag", desc: "Top selling diaper bag", price: 2100 },
    ],
    "Blankets": [
      { id: 9, img: Img9, title: "Soft Blanket", desc: "Perfect for newborns", price: 2500 },
      { id: 10, img: Img10, title: "Warm Blanket", desc: "Thick & cozy", price: 2800 },
      { id: 11, img: Img11, title: "Printed Blanket", desc: "Cute designs", price: 2700 },
      { id: 12, img: Img12, title: "Travel Blanket", desc: "Easy to carry", price: 2600 },
    ],
    "Caps": [
      { id: 13, img: Img13, title: "Woolen Cap", desc: "Keep baby warm", price: 500 },
      { id: 14, img: Img14, title: "Summer Cap", desc: "Light & comfy", price: 450 },
      { id: 15, img: Img15, title: "Printed Cap", desc: "Trendy looks", price: 550 },
      { id: 16, img: Img16, title: "Cotton Cap", desc: "Breathable fabric", price: 600 },
    ],
    "Diaper Bags": [
      { id: 17, img: Img17, title: "Classic Diaper Bag", desc: "Spacious & stylish", price: 3500 },
      { id: 18, img: Img18, title: "Foldable Bag", desc: "With changing mat", price: 3800 },
      { id: 19, img: Img19, title: "Travel Bag", desc: "For long trips", price: 3700 },
      { id: 20, img: Img20, title: "Multi-pocket Bag", desc: "Organized storage", price: 3600 },
    ],
    "New Arrivals": [
      { id: 21, img: Img21, title: "New Arrival Suit", desc: "Latest design", price: 1600 },
      { id: 22, img: Img22, title: "New Arrival Blanket", desc: "Soft cotton", price: 2400 },
      { id: 23, img: Img23, title: "New Arrival Cap", desc: "Trendy design", price: 650 },
      { id: 24, img: Img24, title: "New Arrival Bag", desc: "Stylish backpack", price: 4000 },
    ],
  };

  const displayedItems =
    selectedCategory === "All"
      ? Object.values(items).flat().slice(0, 8)
      : items[selectedCategory] || [];

  return (
    <div className="mt-10 px-4 md:px-10">
      <div className="text-center mb-8">
        <p className="text-3xl font-bold text-gray-800">
          Explore More By
          <span className="text-3xl font-bold text-pink-600 ml-2">Category</span>
        </p>
      </div>

     
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {slides.map((slide) => (
          <div
            key={slide.id}
            onClick={() => setSelectedCategory(slide.title)}
            className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 bg-cover bg-center rounded-lg cursor-pointer overflow-hidden"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="absolute inset-0 bg-pink-500/50 opacity-0 hover:opacity-100 transition flex items-center justify-center">
              <p className="text-xl text-white font-semibold">{slide.title}</p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {displayedItems.map((item) => (
          <ProductCard key={item.id} item={item} category={selectedCategory} id={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
