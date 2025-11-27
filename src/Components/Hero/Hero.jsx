import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image1 from "../../assets/Hero/hero.jpeg";
import Image2 from "../../assets/Hero/hero2.jpeg";
import Image3 from "../../assets/Hero/hero3.jpeg";

const Hero = () => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: "ease-in-out",
    pauseOnHover: false,
  };

  const slides = [
    {
      id: 1,
      img: Image1,
      title: "About Us",
      desc: "Our mission is to provide the best baby brands and products for parents across Pakistan.",
      btn: "Read More",
    },
    {
      id: 2,
      img: Image2,
      title: "Why Choose KidCo?",
      desc: "Nationwide delivery, trusted brands, and comfort for every little one — only at KidCo.",
      btn: "Discover More",
    },
    {
      id: 3,
      img: Image3,
      title: "Accessories Collection",
      desc: "Complete the look with our cute, comfy, and stylish accessories made with love.",
      btn: "Explore Now",
    },
  ];

  return (
    <section className="relative w-full h-[90vh] md:h-screen overflow-hidden font-[Poppins]">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[90vh] md:h-screen">
            
            <motion.img
              src={slide.img}
              alt={slide.title}
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-full h-full object-cover object-center"
            />

            
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

            
            <motion.div
              className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              
              <motion.h2
                className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-white to-yellow-300 mb-3 drop-shadow-[0_3px_10px_rgba(255,255,255,0.4)] tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {slide.title}
              </motion.h2>

             
              <motion.p
                className="text-sm md:text-xl text-gray-200 max-w-2xl mb-6 leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {slide.desc}
              </motion.p>

              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(236,72,153,0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-r from-pink-500 to-yellow-400 text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:from-pink-600 hover:to-yellow-500 transition-all duration-300 text-sm md:text-base"
              >
                {slide.btn}
              </motion.button>
            </motion.div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
