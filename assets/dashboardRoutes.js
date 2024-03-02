import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Aos from "aos";
import axios from "axios";

import Sidebar from "./js/components/layout/SidebarLayout";
import Footer from "./js/components/layout/FooterLayout";
import DashboardNavbar from "./js/components/layout/DashboardNavbarLayout";

import Dashboard from "./js/pages/dashboard/Dashboard";
import Events from "./js/pages/dashboard/Events";
import EventDetail from "./js/pages/dashboard/EventDetails";
import EventParticipants from "./js/pages/dashboard/EventParticipants";

function DashboardRoutes() {
  Aos.init();

  return (
    <>
      <DashboardNavbar />
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route
          path="/events/:id/participants"
          element={<EventParticipants />}
        />
      </Routes>
      <Footer dashboard={true} />
    </>
  );
}

export default DashboardRoutes;
