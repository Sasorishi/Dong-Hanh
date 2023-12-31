import React from "react";

const CommunitySection = () => {
  const handleJoinUsClick = () => {
    window.open("https://www.instagram.com/donghanhvn/", "_blank");
  };

  return (
    <section className="community py-6 px-0">
      <div className="container-fluid wrapper-element">
        <div
          className="col-12 text-center"
          data-aos="zoom-in-up"
          data-aos-offset="50"
          data-aos-easing="ease-in-sine"
          data-aos-duration="500"
        >
          <span>Đồng Hành</span>
          <h1>Be part of our community</h1>
          <button
            type="button"
            onClick={handleJoinUsClick}
            className="uppercase text-white bg-darkblue hover:bg-rosered font-medium rounded-full text-sm px-4 py-2 text-center mt-5"
          >
            Join us
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
