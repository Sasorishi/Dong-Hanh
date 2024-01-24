// assets/js/components/App.js
import React, { useEffect, useState } from "react";
import Toast from "../../components/ToastComponent";
import IntroductionSection from "../../components/homepage/IntroductionComponent";
import SeparatorSection from "../../components/homepage/SeparatorComponent";
import AboutUsSection from "../../components/homepage/AboutUsComponent";
import ActivitiesSection from "../../components/homepage/ActivitiesComponent";
import JourneySection from "../../components/homepage/JourneyComponent";
import CommunitySection from "../../components/homepage/CommunityComponent";
import TeamSection from "../../components/homepage/TeamComponent";
import ContactSection from "../../components/homepage/ContactComponent";

const App = () => {
  const [error, setError] = useState(null);

  const closeToast = () => {
    setError(null);
  };

  const handleError = (value) => {
    setError(value);
    setTimeout(() => {
      closeToast();
    }, 5000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const errorFromSymfony = window.errorFromSymfony;

      if (errorFromSymfony) {
        if (errorFromSymfony.message) {
          setError(errorFromSymfony.message);

          setTimeout(() => {
            closeToast();
          }, 5000);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {error && <Toast message={error} onClose={closeToast} error={true} />}
      <IntroductionSection />
      <SeparatorSection />
      <AboutUsSection />
      <ActivitiesSection />
      <JourneySection />
      <CommunitySection />
      <TeamSection />
      <ContactSection onError={handleError} />
    </>
  );
};

export default App;
