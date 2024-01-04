/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "./api";

import Navbar from "./js/components/layout/NavbarLayout";
import Footer from "./js/components/layout/FooterLayout";

import App from "./js/pages/homepage/App";
import Login from "./js/pages/auth/Login";
import Signup from "./js/pages/auth/Signup";
import Account from "./js/pages/account/Account";
import Events from "./js/pages/events/Events";
import Response from "./js/pages/responses/response";

const Main = () => {
  AOS.init();

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("/api/auth/is-authenticated");

        if (response.status === 200) {
          const data = response.data;
          setIsAuthenticated(data.isAuthenticated);
        } else {
          console.error("Erreur lors de la vérification de l'authentification");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification",
          error
        );
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={isAuthenticated ? <App /> : <Login />} />
        <Route
          path="/signup"
          element={isAuthenticated ? <App /> : <Signup />}
        />
        <Route
          path="/account"
          element={!isAuthenticated ? <App /> : <Account />}
        />
        <Route path="/events" element={<Events />} />
        <Route path="/response/:type" element={<Response />} />
      </Routes>
      <Footer />
    </Router>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Main />);

$(document).ready(function () {
  // checkbox();
  // navbar();
  // $(window).scroll(function () {
  //   navbar();
  // });

  $(".check-agreement").on("change", function () {
    checkedFunc("waiver", "guardian");
  });
});
