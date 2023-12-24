import React from "react";

const ActivitiesSection = () => {
  return (
    <section className="activities" id="activities">
      <div className="container">
        <div className="py-5 text-center">
          <span>Activities</span>
          <h1>What we do</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 mt-5 justify-items-center">
          <div
            className="lg:w-4/12 md:w-full sm:w-full"
            data-aos="zoom-in-up"
            data-aos-duration="1500"
            data-aos-offset="100"
          >
            <div className="wrapper-card text-center mx-auto align-bottom bg-cream">
              <img
                className="object-contain h-48 w-96 mx-auto"
                src="images/7490.png"
                alt="about_us_people_worldwide"
              />
              <p>
                We organize summer camps for attendees to learn about their
                Vietnamese identity and culture
              </p>
            </div>
          </div>
          <div
            className="lg:w-4/12 md:w-full sm:w-full"
            data-aos="zoom-in-up"
            data-aos-duration="1500"
            data-aos-offset="150"
          >
            <div className="wrapper-card text-center mx-auto bg-cream">
              <img
                className="object-contain h-48 w-96 mx-auto"
                src="images/5236.png"
                alt="about_us_teambuilding"
              />
              <p>
                We host movement building and digital activism seminars for
                collaboration in projects with social impact
              </p>
            </div>
          </div>
          <div
            className="lg:w-4/12 md:w-full sm:w-full"
            data-aos="zoom-in-up"
            data-aos-duration="1500"
            data-aos-offset="200"
          >
            <div className="wrapper-card text-center mx-auto bg-cream">
              <img
                className="object-contain h-48 w-96 mx-auto"
                src="images/vecteezy_two-boys-high-fived-each-other-the-concept-of-friendship_12763712.png"
                alt="about_us_friendship"
              />
              <p>
                We provide trainings to build skills and have tools for
                engagement in community organizing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;