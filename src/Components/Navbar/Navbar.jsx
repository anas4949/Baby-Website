import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../../Context/CartContext";
import CartDrawer from "../cart/CartDrawer";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaBaby,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

 


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);


  useEffect(() => {
    function handleClickOutside(e) {
      if (
        searchOpen &&
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  const menuItems = [
    "Flash Sale (Up to 50% Off)",
    "Category",
    "Home",
    "Contact Us",
    "Reviews",
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("Searching for:", query);
    setQuery("");
    setSearchOpen(false);
  };

  return (
    <>
      <nav
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
          searchOpen
            ? "bg-white shadow-md"
            : "bg-white/20 backdrop-blur-md border-b border-white/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold cursor-pointer">
            
            <FaBaby  className="text-pink-500 text-3xl" />
            <span className="text-2xl text-gray-800">𝑲𝒊𝒅𝑪𝒐</span>
          </div>

          <ul className="hidden md:flex gap-6 font-medium text-gray-800">
            <NavLink
              to={"/sale"}
              className="relative group cursor-pointer transition-all"
            >
              <span className="hover:text-pink-500 transition">
                Flash Sale (Up to 50% Off)
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full" />
            </NavLink>
            <NavLink
              to={"/category"}
              className="relative group cursor-pointer transition-all"
            >
              <span className="hover:text-pink-500 transition">Category</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full" />
            </NavLink>
            <NavLink
              to={"/"}
              className="relative group cursor-pointer transition-all"
            >
              <span className="hover:text-pink-500 transition">Home</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full" />
            </NavLink>
            <NavLink
              to={"/contact"}
              className="relative group cursor-pointer transition-all"
            >
              <span className="hover:text-pink-500 transition">Contact Us</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full" />
            </NavLink>
            <NavLink
              to={"/reviews"}
              className="relative group cursor-pointer transition-all"
            >
              <span className="hover:text-pink-500 transition">Reviews</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full" />
            </NavLink>
          </ul>

          <div className="flex items-center space-x-4 text-xl text-gray-800">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              className="cursor-pointer hover:text-pink-500 transition"
            >
              <FaSearch />
            </button>
            <FaUser className="cursor-pointer hover:text-pink-500 transition" />
            <div
              className="relative cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <FaShoppingCart
                size={22}
                className="cursor-pointer hover:text-pink-500 transition"
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </div>
            {/* <FaShoppingCart className="cursor-pointer hover:text-pink-500 transition" /> */}
            <button
              onClick={() => setIsOpen((s) => !s)}
              aria-label="Toggle menu"
              className="md:hidden text-2xl hover:text-pink-500 transition"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div
            className="hidden md:flex justify-center bg-white py-4 shadow-md"
            ref={searchRef}
          >
            <form onSubmit={handleSearchSubmit} className="w-2/3 lg:w-1/2 flex">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search products..."
                autoFocus
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                className="px-4 bg-pink-500 text-white rounded-r-lg hover:bg-pink-600 transition"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        )}

        {searchOpen && (
          <div
            className="md:hidden bg-white border-t shadow-md px-6 py-3"
            ref={searchRef}
          >
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search products..."
                autoFocus
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                className="px-4 bg-pink-500 text-white rounded-r-lg hover:bg-pink-600 transition"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        )}

        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-md">
            <ul className="flex flex-col space-y-4 px-6 py-4 font-medium text-gray-800">
              <NavLink
                to="/sale"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition"
              >
                Flash Sale (Up to 50% Off)
              </NavLink>
              <NavLink
                to="/category"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition"
              >
                Category
              </NavLink>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition"
              >
                Home
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition"
              >
                Contact Us
              </NavLink>
              <NavLink
                to="/reviews"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition"
              >
                Reviews
              </NavLink>
            </ul>
          </div>
        )}
      </nav>

      <CartDrawer isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
