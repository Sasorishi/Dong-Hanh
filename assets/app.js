/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "flowbite";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aos from "aos";
import FrontRoutes from "./frontRoutes";

const Main = () => {
  const handleRouteUpdate = () => {
    Aos.refresh();
  };

  return (
    <Router onUpdate={handleRouteUpdate}>
      <Routes>
        <Route path="/*" element={<FrontRoutes />} />
      </Routes>
    </Router>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Main />);
