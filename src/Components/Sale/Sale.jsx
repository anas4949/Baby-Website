import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { toast } from "react-toastify";

import Image2 from "../../assets/sale/img2.jpeg";
import Image3 from "../../assets/sale/img3.jpeg";
import Image4 from "../../assets/sale/img4.jpeg";
import Image5 from "../../assets/sale/img5.jpeg";
import Image6 from "../../assets/sale/img6.jpeg";
import Image7 from "../../assets/sale/img7.jpeg";
import Image8 from "../../assets/sale/img8.jpeg";
import Image9 from "../../assets/sale/img9.jpeg";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  
  const quickAdd = async (e) => {
  
    e.preventDefault();
    e.stopPropagation();

    if (item.isDress) {
      navigate(`/product/${item.id}`);
      return;
    }

    try {
      const res = await Promise.resolve(addToCart(item, 1, null));
      // If your addToCart returns boolean, convert to uniform shape
      if (res == null) {
        shape
        toast.success("🛍️ Added to cart!");
        return;
      }

      
      if (typeof res === "object") {
        if (res.ok) {
          toast.success(res.message || "🛍️ Added to cart!");
        } else {
          toast.error(res.message || "❌ Could not add to cart");
        }
        return;
      }

      if (res) {
        toast.success("🛍️ Added to cart!");
      } else {
        toast.error("❌ Could not add to cart");
      }
    } catch (err) {
      console.error("addToCart error:", err);
      toast.error("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="group relative bg-white rounded-xl shadow-md transition hover:shadow-lg cursor-pointer"
      
      onClick={() => navigate(`/product/${item.id}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.img1}
          alt={item.title}
          className="w-full h-[280px] object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {item.img2 && (
          <img
            src={item.img2}
            alt={item.title}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
          SALE
        </span>
      </div>

      <div className="p-4 text-center">
        <h3 className="font-medium text-gray-700 text-sm line-clamp-2">
          {item.title}
        </h3>
        <p className="font-bold text-pink-600 mt-1">Rs {item.price}</p>

        <div className="mt-3 flex justify-center gap-2">
          <button
            type="button"
            onClick={quickAdd}
            className="bg-pink-600 text-white px-3 py-2 rounded hover:bg-pink-700 transition"
            aria-label={`Add ${item.title} to cart`}
          >
            Add
          </button>

          <button
            type="button"
            onClick={(e) => {
              
              e.stopPropagation();
              navigate(`/product/${item.id}`);
            }}
            className="px-3 py-2 border rounded hover:bg-gray-100 transition"
            aria-label={`View ${item.title}`}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

const Sale = () => {
  const navigate = useNavigate();
  const SaleData = [
    {
      id: 1,
      img1: Image3,
      img2: Image2,
      title:
        "Sunnozy All Weather Pack Of 3 Footed Rompers (0-6M) | Soft Cotton Sleepsuits",
      price: 2500,
      isDress: true,
      description:
        "Soft and cozy 3-pack of all-weather rompers made from pure cotton for newborn comfort.",
    },
    {
      id: 2,
      img1: Image4,
      img2: Image7,
      title: "Winter Woolen Baby Hooded Rompers | Ultra-Soft Knit Jumpsuit",
      price: 2500,
      isDress: true,
      description:
        "Warm woolen romper designed to keep your baby snug during the winter season.",
    },
    {
      id: 3,
      img1: Image5,
      img2: Image6,
      title: "Unisex Cow Print Hooded Rompers | Plush Animal Onesie",
      price: 2500,
      isDress: true,
      description:
        "Cute and comfortable plush cow-print romper with a soft hood.",
    },
    {
      id: 4,
      img1: Image8,
      img2: Image9,
      title:
        "Lovevook 3-in-1 Foldable Changing Baby Bed Diaper Bag Backpack With Station",
      price: 2500,
      isDress: false,
      description:
        "Spacious multifunctional diaper bag with built-in changing bed and storage compartments.",
    },
  ];

  return (
    <div className="mt-10 mb-10">
      <div className="w-full">
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <span className="sm:text-3xl text-sm sm:font-bold font-medium text-pink-700 blink-sale">
            Flash Sale (Upto 50% Off)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
          {SaleData.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={() => navigate("/sale")}
          className="bg-pink-400 text-gray-600 px-12 py-3 rounded-full mt-10 hover:scale-110 transition-all ease-in-out cursor-pointer"
        >
          More
        </button>
      </div>
    </div>
  );
};

export default Sale;
