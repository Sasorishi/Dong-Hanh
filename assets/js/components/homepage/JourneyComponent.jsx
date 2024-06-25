import React from "react";

const JourneySection = () => {
  return (
    <section className="our-journey" id="our-journey">
      <div className="container-fluid wrapper-element">
        <div className="py-5 text-center">
          <span className="text-whitesmoke">Our journey</span>
          <h1>We organize events in all these places</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-8 mt-5">
          <div
            className="sm:col-span-12 md:col-span-12 lg:col-span-3 row-span-2"
            data-aos="zoom-in-up"
            data-aos-offset="280"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="card h-52 w-full germany">
              <div className="filter">
                <span className="px-5">Germany</span>
              </div>
            </div>
          </div>
          <div
            className="sm:col-span-12 md:col-span-12 lg:col-span-3 row-span-2"
            data-aos="zoom-in-up"
            data-aos-offset="380"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="card h-52 w-full norway">
              <div className="filter">
                <span className="px-5">Norway</span>
              </div>
            </div>
          </div>
          <div
            className="sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-2"
            data-aos="zoom-in-up"
            data-aos-offset="480"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="card h-52 w-full france">
              <div className="filter">
                <span className="px-5">France</span>
              </div>
            </div>
          </div>
          <div
            className="sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-2"
            data-aos="zoom-in-up"
            data-aos-offset="280"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="card h-52 w-full switzerland">
              <div className="filter">
                <span className="px-5">Switzerland</span>
              </div>
            </div>
          </div>
          <div
            className="sm:col-span-12 md:col-span-12 lg:col-span-3 row-span-2"
            data-aos="zoom-in-up"
            data-aos-offset="380"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="card h-52 sm:h-full md:h-full lg:h-52 w-full london">
              <div className="filter">
                <span className="px-5">London</span>
              </div>
            </div>
          </div>
          <div
            className="sm:col-span-12 md:col-span-12 lg:col-span-3 row-span-2"
            data-aos="zoom-in-up"
            data-aos-offset="480"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="card h-52 w-full denmark">
              <div className="filter">
                <span className="px-5">Denmark</span>
              </div>
            </div>
          </div>
          <div
            className="sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-2"
            data-aos="zoom-in-up"
            data-aos-offset="280"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="card h-52 w-full canada">
              <div className="filter">
                <span className="px-5">Canada</span>
              </div>
            </div>
          </div>
          <div
            className="sm:col-span-12 md:col-span-12 lg:col-span-3 row-span-2"
            data-aos="zoom-in-up"
            data-aos-offset="380"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="card h-52 w-full australia">
              <div className="filter">
                <span className="px-5">Australia</span>
              </div>
            </div>
          </div>
          <div
            className="sm:col-span-12 md:col-span-12 lg:col-span-3 row-span-2"
            data-aos="zoom-in-up"
            data-aos-offset="480"
            data-aos-duration="500"
            data-aos-easing="ease-in-sine"
          >
            <div className="card h-52 w-full usa">
              <div className="filter">
                <span className="px-5">United States</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
