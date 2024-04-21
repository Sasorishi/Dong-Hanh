import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Aos from "aos";
import axios from "axios";

import Navbar from "./js/components/layout/NavbarLayout";
import Footer from "./js/components/layout/FooterLayout";

import App from "./js/pages/homepage/App";
import Login from "./js/pages/auth/Login";
import Signup from "./js/pages/auth/Signup";
import Account from "./js/pages/account/Account";
import Events from "./js/pages/events/Events";
import EventDetail from "./js/pages/events/EventDetail";
import Response from "./js/pages/responses/response";
import Register from "./js/pages/register/Register";
import Checkout from "./js/pages/checkout/Checkout";
import ForgetPassword from "./js/pages/auth/ForgetPassword";
import ResetPassword from "./js/pages/auth/ResetPassword";
import Introduction from "./js/pages/homepage/Introduction";
import About from "./js/pages/homepage/About";
import PrivacyPolicy from "./js/pages/homepage/PrivacyPolicy";
import TermsAndConditionsOfSale from "./js/pages/homepage/TermsAndConditionsOfSale";

function FrontRoutes() {
  Aos.init();

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
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/forget_password"
          element={isAuthenticated ? <App /> : <ForgetPassword />}
        />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/login" element={isAuthenticated ? <App /> : <Login />} />
        <Route
          path="/signup"
          element={isAuthenticated ? <App /> : <Signup />}
        />
        <Route path="/account" element={<Account />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/response/:redirection/:type" element={<Response />} />
        <Route
          path="/register/:eventId/:numTickets"
          element={isAuthenticated ? <Register /> : <Navigate to="/login" />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/terms_and_conditions_of_sale"
          element={<TermsAndConditionsOfSale date="7th March 2024" />}
        />
        <Route
          path="/privacy_policy"
          element={<PrivacyPolicy date="7th March 2024" />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default FrontRoutes;
