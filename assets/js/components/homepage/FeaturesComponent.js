import React from "react";
import Image from "../../../../public/images/AdobeStock_255760077.jpeg";

const FeaturesSection = () => {
  return (
    <section className="bg-whitesmoke px-0">
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto items-center grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="px-[2rem]">
              <div className="lg:max-w-lg">
                <span className="mb-4 text-darkblue">Our journey</span>
                <h1 className="mb-8">Be part to great adventure here.</h1>
                {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </p> */}
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-cognac">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M377 52c11-13.8 8.8-33.9-5-45s-33.9-8.8-45 5L288 60.8 249 12c-11-13.8-31.2-16-45-5s-16 31.2-5 45l48 60L12.3 405.4C4.3 415.4 0 427.7 0 440.4V464c0 26.5 21.5 48 48 48H288 528c26.5 0 48-21.5 48-48V440.4c0-12.7-4.3-25.1-12.3-35L329 112l48-60zM288 448H168.5L288 291.7 407.5 448H288z" />
                      </svg>
                      Trai he
                    </dt>{" "}
                    :{" "}
                    <dd className="inline text-darkblue">
                      A leadership camp to connect with your roots and learn
                      about Vietnamese culture, traditions, and history. Create
                      lifelong memories with friends from all around the world
                      through team building activities and workshops.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-cognac">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                      </svg>
                      Training formation
                    </dt>{" "}
                    :{" "}
                    <dd className="inline">
                      Unlock your potential with our Training Formation program,
                      blending language mastery in English and Vietnamese with
                      practical skills in Photoshop and video editing.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-cognac">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384V352h16V480c0 17.7 14.3 32 32 32s32-14.3 32-32V192h56 64 16c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64H576V256H384V224H320v48c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H368c-26.5 0-48 21.5-48 48v80H243.1 177.1c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9V480c0 17.7 14.3 32 32 32s32-14.3 32-32z" />
                      </svg>
                      Activism seminar
                    </dt>{" "}
                    :{" "}
                    <dd className="inline">
                      Empower change at our Activism Seminar—ignite passion,
                      build strategies, and connect with like-minded advocates
                      for a brighter future.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <img
              src={Image}
              alt="features_img"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
          <div className="flex flex-wrap items-end justify-end mt-5 mb-5 mr-5">
            <a href="/events">
              <button
                type="button"
                className="animation-hover flex items-center uppercase text-darkblue hover:text-bordeau font-medium rounded-full text-sm px-4 py-2 text-center"
              >
                more events
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
