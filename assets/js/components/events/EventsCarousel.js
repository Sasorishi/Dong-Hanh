import React from "react";
import SmallEventCard from "@components/events/SmallEventCardComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

const EventCarousel = ({ events }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      centeredSlides={true}
      navigation={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      style={{
        "--swiper-navigation-color": "text-darkblue",
        "--swiper-navigation-size": "24px",
        "--swiper-pagination-color": "#0d1b2a",
      }}
    >
      {events.map((event, index) => (
        <SwiperSlide className="px-12 pb-12">
          <div key={index}>
            <SmallEventCard event={event} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EventCarousel;
