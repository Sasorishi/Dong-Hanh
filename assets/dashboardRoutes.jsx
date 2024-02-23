import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Aos from "aos";
import axios from "axios";

import Footer from "./js/components/layout/FooterLayout";

import Dashboard from "./js/pages/dashboard/dashboard";

function DashboardRoutes() {
  Aos.init();

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default DashboardRoutes;
