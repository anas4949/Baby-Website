import React from 'react'
import Banner from '../../assets/banner/banner1.jpg'

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Subscribe = () => {
  return (
    <div
      className="mt-10 bg-pink-400 dark:bg-gray-800 text-white "
      
    >
      <div className=" backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl m-auto ">
          <h1 className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold">
            Get Notified About New Products
          </h1>
          <h2 className='flex  text-center justify-center'>
            Be the first to know about new collections and exclusive offers.</h2>
          <div className='flex items-center mb-3 mx-3 sm:mx-0 '>
          <input
            type="text"
            placeholder="Enter Your Email "
            className=" bg-white text-gray-700 w-full p-3"
          />
          <button 
          className='text-gray-300 bg-pink-500 py-3 px-2 cursor-pointer  '
          type='submit'>Subscribe</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Subscribe;