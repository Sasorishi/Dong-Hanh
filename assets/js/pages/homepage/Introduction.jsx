import React from "react";
import ImageCover from "@images/DSC_0039.jpg";
import Image1 from "@images/20230709_104807.jpg";

const Introduction = () => {
  return (
    <section className="bg-whitesmoke">
      <div className="h-[18rem] max-w-full shadow-lg mb-8">
        <img
          className="h-full w-full object-cover rounded-lg"
          src={ImageCover}
          alt="Image cover"
        />
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 m-auto">
          <span className="text-darkblue">Vietnamese community</span>
          <h1 className="text-4xl">Đồng Hành Network</h1>
          <hr />
          <p className="mb-8 max-w-[480px]">
            Our Vietnamese community welcomes individuals worldwide, dedicated
            to fostering meaningful connections and social interactions.
          </p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2">
          <div className="h-[18rem] max-w-full shadow-lg mb-8">
            <img
              className="h-full w-full object-cover rounded-lg"
              src={Image1}
              alt="image description"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
