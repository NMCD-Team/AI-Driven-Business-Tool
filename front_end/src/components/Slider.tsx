import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center">
      <Swiper
        spaceBetween={10}
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
        className="mySwiper w-full max-w-6xl h-96 rounded-xl shadow-xl shadow-sky-500"
      >
        <SwiperSlide>
          <img
            className="w-full h-full object-cover rounded-xl"
            src="https://techcrunch.com/wp-content/uploads/2015/09/entrepreneur.jpg"
            alt="Entrepreneur"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="w-full h-full object-cover rounded-xl"
            src="https://assets.entrepreneur.com/content/3x2/2000/5-qualities-successful-entrepreneurs.jpg"
            alt="Successful Entrepreneurs"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="w-full h-full object-cover rounded-xl"
            src="https://cloudinary.hbs.edu/hbsit/image/upload/s--D4pGfy8O--/f_auto,c_fill,h_375,w_750,/v20200101/86307C57B70F0959AB77FD04F11979D7.jpg"
            alt="Entrepreneur Success"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
