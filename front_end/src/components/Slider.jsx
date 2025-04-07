import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper absolute rounded-xl md:h-96 h-72 shadow-xl shadow-sky-500"
      >
        <SwiperSlide>
          <img
            className="w-full h-full object-cover"
            src="https://techcrunch.com/wp-content/uploads/2015/09/entrepreneur.jpg"
            alt="Entrepreneur"
          />
        </SwiperSlide>
    
        <SwiperSlide>
          <img
            className="w-full h-full object-cover"
            src="https://assets.entrepreneur.com/content/3x2/2000/5-qualities-successful-entrepreneurs.jpg"
            alt="Successful Entrepreneurs"
          />
        </SwiperSlide>
      
        <SwiperSlide>
          <img
            className="w-full h-full object-cover"
            src="https://cloudinary.hbs.edu/hbsit/image/upload/s--D4pGfy8O--/f_auto,c_fill,h_375,w_750,/v20200101/86307C57B70F0959AB77FD04F11979D7.jpg"
            alt="Entrepreneur Success"
         />
        </SwiperSlide>
      </Swiper>
      <div className="absolute inset-0 bg-black opacity-30 z-20 rounded-xl"></div>
    </div>
  );
};

export default Slider;
