import React from "react";

const TeamSection = () => {
  return (
    <section className="team" id="team">
      <div className="container-fluid wrapper-element">
        <div className="py-5 text-center">
          <span>Team members</span>
          <h1>Who we are</h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-5">
          <div
            className="mb-5 lg:w-4/12 md:w-full sm:w-full"
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
          >
            <div className="wrapper-card text-center flex-cols mx-auto">
              <span className="frame duyen"></span>
              <p className="name">Duyen</p>
              <p>USA Representative</p>
            </div>
          </div>
          <div
            className="mb-5 lg:w-4/12 md:w-full sm:w-full"
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
          >
            <div className="wrapper-card text-center flex-cols mx-auto">
              <span className="frame tri"></span>
              <p className="name">Tri</p>
              <p>EU Representative</p>
            </div>
          </div>
          <div
            className="mb-5 lg:w-4/12 md:w-full sm:w-full"
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <div className="wrapper-card text-center flex-cols mx-auto">
              <span className="frame lan"></span>
              <p className="name">Lan</p>
              <p>EU Representative</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
