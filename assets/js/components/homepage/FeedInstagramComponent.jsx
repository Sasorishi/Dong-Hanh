import React, { useEffect } from "react";

const FeedInstagramSection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute("data-use-service-core", true);
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="bg-whitesmoke px-0">
      <div
        className="elfsight-app-37e545bb-d1df-4e3c-926d-e5f55f7f2450"
        data-elfsight-app-lazy
      />
    </section>
  );
};

export default FeedInstagramSection;
