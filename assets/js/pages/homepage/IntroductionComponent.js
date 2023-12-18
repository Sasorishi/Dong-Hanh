import React from "react";

const IntroductionSection = () => {
  return (
    <section className="introduction" id="introduction">
      <div className="trong-dong">
        <div className="flex flex-col lg:flex-row">
          <div
            className="lg:w-7/12 md:w-full sm:w-full mx-auto my-auto"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <span>Vietnamese community</span>
            <h1>Đồng Hành Network</h1>
            <hr />
            <p>
              A 4-day leadership camp to connect with your roots and learn about
              Vietnamese culture, traditions, and history. Create lifelong
              memories with friends from all around the world through team
              building activities and workshops.
            </p>
            <div className="flex gap-4 mt-5 mb-5">
              <a href="/app_register">
                <button
                  type="button"
                  className="uppercase text-white bg-cognac hover:bg-rosered font-medium rounded-full text-sm px-4 py-2 text-center"
                >
                  Get your ticket
                </button>
              </a>
              <button
                type="button"
                className="uppercase text-white bg-darkblue hover:bg-rosered font-medium rounded-full text-sm px-4 py-2 text-center"
              >
                Learn more
              </button>
            </div>
          </div>
          <div
            className="lg:w-5/12 md:w-full sm:w-full"
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <img
              className="img-fluid event-main"
              src="images/Banner - 2023.jpg"
              alt="current_event"
            />
            <div className="event-information text-left">
              <p className="">92 € (with transportation)</p>
              <p className="mb-3">72 € (without transportation)</p>
              <p className="mb-1">
                Date : July 06<sup>th</sup> to 09<sup>th</sup>, 2023
              </p>
              <p>
                Address :{" "}
                <a
                  target="_blank"
                  href="https://www.google.com/maps/place/Egeruphytten/@55.2750846,11.2536974,18z/data=!4m13!1m7!3m6!1s0x464d5e838089ac27:0x34689db1b340138d!2sEgerupvej+49,+4230+Sk%C3%A6lsk%C3%B8r,+Danemark!3b1!8m2!3d55.2750257!4d11.2548142!3m4!1s0x464d5e8389a04ec5:0x4021016010e18f80!8m2!3d55.2750727!4d11.2548531"
                >
                  Egerupvej 49, 4230 Skælskør, DENMARK
                </a>
              </p>
              <div className="information">
                <p className="mt-3">
                  *Arrive at Copenhagen Airport by 5pm on July 06<sup>th</sup>,
                  depart from Camp site by 1pm on July 09<sup>th</sup>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default IntroductionSection;
