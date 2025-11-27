import React from 'react'
import Image1 from '../../assets/review/female1.jpg'
import Image2 from '../../assets/review/female2.jpg'
import Image3 from '../../assets/review/female3.jpg'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Autoplay } from 'swiper/modules';


const ReviewsData = [
    {
        
        name:"Zoi",
        text:"Your Products are Amazing",
        img:Image1
    },
     {
        
        name:"Zoi",
        text:"Your Products are Amazing",
        img:Image2
    },
     {
        
        name:"Zoi",
        text:"Your Products are Amazing",
        img:Image3
    },
    {
        
        name:"Zoi",
        text:"Your Products are Amazing",
        img:Image1
    },
     {
        
        name:"Zoi",
        text:"Your Products are Amazing",
        img:Image2
    },
     {
        
        name:"Zoi",
        text:"Your Products are Amazing",
        img:Image3
    },


];

const Reviews = () => {
    const settings = {
        dots:true,
        infinite:true,
        speed:300,
        slidesToShow:3,
        autoplay:true,
        autoplaySpeed:3000,
        slidesToScroll:1,
        cssEase:"ease-in-out",
        responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
    };
  return (
    <div className='px-5 overflow-hidden mt-5'>
        <div className='mt-5 py-10'>
            <h1 className='text-3xl font-bold text-gray-800 text-center pb-5'>Customers <span className='text-pink-600'>Reviews</span></h1>
            <Slider {...settings}>
            {ReviewsData.map((d) => (
                <div className='bg-white py-2 mt-10 text-black '>
                    <div className=' flex justify-center items-center'>
                        <img src={d.img} className='sm:h-40 sm:w-40 w-20 h-20 rounded-full' alt=''/>
                    </div>
                    <div className='flex flex-col gap-4 pt-2 justify-center items-center'>
                        <p className='sm:text-xl  font-medium sm:font-semibold'>{d.name}</p>
                        <p className='text-[10px] text-center sm:text-xl'>{d.text}</p>
                    </div>
                </div>
            ))}
            </Slider>
        </div>

    </div>
  )
}

export default Reviews