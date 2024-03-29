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
import Login from "./js/pages/dashboard/Login";
import EventsCategories from "./js/pages/dashboard/EventsCategories";
import Tickets from "./js/pages/dashboard/Tickets";
import Users from "./js/pages/dashboard/Users";
import TicketCreate from "./js/pages/dashboard/TicketCreate";

function DashboardRoutes() {
  Aos.init();

  return (
    <>
      <DashboardNavbar />
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route
          path="/events/:id/participants"
          element={<EventParticipants />}
        />
        <Route path="/events/categories" element={<EventsCategories />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/create" element={<TicketCreate />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <Footer dashboard={true} />
    </>
  );
}

export default DashboardRoutes;
