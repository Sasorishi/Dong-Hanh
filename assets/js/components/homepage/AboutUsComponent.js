import React from "react";

const AboutUsSection = () => {
  return (
    <section className="about-us px-0" id="about-us">
      <div className="container-fluid">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-4/12 md:w-full sm:w-full" />
          <div className="lg:w-8/12 md:w-full sm:w-full wrapper-card text-center p-8 lg:rounded-l-xl">
            <span
              data-aos="fade-up"
              data-aos-offset="50"
              data-aos-easing="ease-in-sine"
              data-aos-duration="500"
            >
              About us
            </span>
            <h1
              data-aos="fade-up"
              data-aos-offset="80"
              data-aos-easing="ease-in-sine"
              data-aos-duration="500"
            >
              Đồng Hành
            </h1>
            <hr
              className="solid divider-center"
              data-aos="fade-up"
              data-aos-offset="80"
              data-aos-easing="ease-in-sine"
              data-aos-duration="500"
            />
            <p
              data-aos="fade-up"
              data-aos-offset="90"
              data-aos-easing="ease-in-sine"
              data-aos-duration="500"
            >
              We are a group of Vietnamese youth across the world who want to
              create a space for others to come together, develop leadership
              skills, learn about Vietnamese heritage, and contribute to
              building movements for social change. This network was developed
              as a program from Viet Tan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
