import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Subscribe from "./Components/Subscribe/Subscribe";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom"; 
import Sale from "./Components/Sale/Sale";
import Collection from "./Components/Collection/Collection";
import Reviews from "./Components/Reviews/Reviews";
import ProductDetail from "./Pages/ProductDetail";
import CollectionDetail from "./Pages/CollectionDetail";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import './app.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import { CartProvider } from "./Context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <div>
        <div className="text-center bg-gray-400 py-5 mx-auto">
          <span className="sm:text-3xl text-sm sm:font-bold font-medium  text-pink-700 blink-sale">
            Flash Sale (Upto 50% Off)
          </span>
         
        </div>
        <ToastContainer position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="custom-toast" />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Subscribe />} />
          <Route path="/category" element={<Collection />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/collection/:id" element={<CollectionDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          


          
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
