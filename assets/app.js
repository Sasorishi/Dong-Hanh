/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import $ from "jquery";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./js/pages/homepage/App";
import Login from "./js/pages/Login";
import Navbar from "./js/components/layout/NavbarLayout";
import Footer from "./js/components/layout/FooterLayout";

const Main = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
      </Routes>
      <Footer />
    </Router>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Main />);

$(document).ready(function () {
  AOS.init();
  // checkbox();
  // navbar();
  // $(window).scroll(function () {
  //   navbar();
  // });

  $(".check-agreement").on("change", function () {
    checkedFunc("waiver", "guardian");
  });
});
