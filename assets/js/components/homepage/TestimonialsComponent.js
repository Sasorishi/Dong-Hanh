import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import PersonPicture1 from "@images/uifaces-human-image.jpg";
import PersonPicture2 from "@images/uifaces-2.jpg";
import PersonPicture3 from "@images/uifaces-3.jpg";

const TestimonialsSection = () => {
  return (
    <section className="bg-testimonial p-0">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        navigation={true}
        loop={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
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
        <SwiperSlide className="px-12 pb-12">
          <div className="text-center">
            <figure className="py-[4rem] sm:px-[8rem] md:px-[8rem] lg:px-[8rem] mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-cognac"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-medium text-cognac">
                  Dồng Hành feels like home—a place where I can meet friends and
                  explore diverse cultures worldwide. Connecting with Vietnamese
                  youth, I find joy in conversations that inspire me to envision
                  a greater version of myself.
                </p>
              </blockquote>
            </figure>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img
                className="w-8 h-8 rounded-full"
                src={PersonPicture1}
                alt="profile picture"
              />
              <div className="flex items-center divide-x divide-[#0d1b2a]">
                <p className="pr-3 font-medium text-cognac">Hélène Hoa Bi</p>
                <p className="pl-3 text-sm font-light text-cognac">
                  Trai He - Paris 2017
                </p>
              </div>
            </figcaption>
          </div>
        </SwiperSlide>
        <SwiperSlide className="px-12 pb-12">
          <div className="text-center">
            <figure className="py-[4rem] px-[2rem] sm:px-[8rem] md:px-[8rem] lg:px-[8rem] mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-cognac"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-medium text-cognac">
                  From the moment I stepped into this, I knew I was in for
                  something special. Connecting with Vietnamese youth was a
                  highlight, as we shared stories, learned from each other, and
                  formed friendships that transcended borders.
                </p>
              </blockquote>
            </figure>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img
                className="w-8 h-8 rounded-full"
                src={PersonPicture3}
                alt="profile picture"
              />
              <div className="flex items-center divide-x divide-[#0d1b2a]">
                <p className="pr-3 font-medium text-cognac">Huynh Bao</p>
                <p className="pl-3 text-sm font-light text-cognac">
                  Trai He - Denmark 2022
                </p>
              </div>
            </figcaption>
          </div>
        </SwiperSlide>
        <SwiperSlide className="px-12 pb-12">
          <div className="text-center">
            <figure className="py-[4rem] px-[2rem] sm:px-[8rem] md:px-[8rem] lg:px-[8rem] mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-cognac"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-medium text-cognac">
                  Connecting with Vietnamese youth opened my eyes to a world of
                  possibilities, inspiring me to embrace diversity and strive
                  for personal growth. Dồng Hành isn't your typical summer
                  camp—it's an adventure of a lifetime
                </p>
              </blockquote>
            </figure>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img
                className="w-8 h-8 rounded-full"
                src={PersonPicture2}
                alt="profile picture"
              />
              <div className="flex items-center divide-x divide-[#0d1b2a]">
                <p className="pr-3 font-medium text-cognac">Léa Tran</p>
                <p className="pl-3 text-sm font-light text-cognac">
                  Trai He - Switzerland 2019
                </p>
              </div>
            </figcaption>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default TestimonialsSection;
