import React from "react";
import ImageCover from "@images/DSC_0039.jpg";
import Image1 from "@images/20230709_104807.jpg";

const Introduction = () => {
  return (
    <section className="bg-whitesmoke py-8 px-4 sm:py-16 sm:px-8 md:px-16 lg:px-32">
      <div className="lg:max-w-[1425px] m-auto">
        <div className="h-48 sm:h-64 md:h-72 lg:h-[18rem] max-w-full shadow-lg mb-6 sm:mb-8 overflow-hidden rounded-lg">
          <img
            className="h-full w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            src={ImageCover}
            alt="Vietnamese community cover image"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1425px"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:w-1/2 m-auto">
            <span className="sub-head text-darkblue text-sm sm:text-base">
              Vietnamese community
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl mt-2 sm:mt-4 font-bold text-gray-900">
              Đồng Hành Network
            </h1>
            <hr className="my-3 sm:my-4 border-gray-300" />
            <p className="mb-6 sm:mb-8 max-w-[480px] text-sm sm:text-base text-gray-700 leading-relaxed">
              Our Vietnamese community welcomes individuals worldwide, dedicated
              to fostering meaningful connections and social interactions.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="h-48 sm:h-64 md:h-72 lg:h-[18rem] max-w-full shadow-lg mb-6 sm:mb-8 overflow-hidden rounded-lg">
              <img
                className="h-full w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                src={Image1}
                alt="Vietnamese community members"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 712px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
