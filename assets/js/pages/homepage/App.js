// assets/js/components/App.js
import React from "react";
import IntroductionSection from "./IntroductionComponent";
import SeparatorSection from "./SeparatorComponent";
import AboutUsSection from "./AboutUsComponent";
import ActivitiesSection from "./ActivitiesComponent";
import JourneySection from "./JourneyComponent";
import CommunitySection from "./CommunityComponent";
import TeamSection from "./TeamComponent";
import ContactSection from "./ContactComponent";

const App = () => {
  return (
    <>
      <IntroductionSection />
      <SeparatorSection />
      <AboutUsSection />
      <ActivitiesSection />
      <JourneySection />
      <CommunitySection />
      <TeamSection />
      <ContactSection />
    </>
  );
};

export default App;
