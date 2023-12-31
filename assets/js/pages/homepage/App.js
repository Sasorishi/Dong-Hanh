// assets/js/components/App.js
import React from "react";
import IntroductionSection from "../../components/homepage/IntroductionComponent";
import SeparatorSection from "../../components/homepage/SeparatorComponent";
import AboutUsSection from "../../components/homepage/AboutUsComponent";
import ActivitiesSection from "../../components/homepage/ActivitiesComponent";
import JourneySection from "../../components/homepage/JourneyComponent";
import CommunitySection from "../../components/homepage/CommunityComponent";
import TeamSection from "../../components/homepage/TeamComponent";
import ContactSection from "../../components/homepage/ContactComponent";

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
