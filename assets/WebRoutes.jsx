import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Aos from "aos";
import axios from "axios";

import Navbar from "./js/components/layout/NavbarLayout";
import Footer from "./js/components/layout/FooterLayout";

import Main from "./js/pages/homepage/App";
import Login from "./js/pages/auth/Login";
import Signup from "./js/pages/auth/Signup";
import Tickets from "./js/pages/account/Tickets";
import Settings from "./js/pages/account/Settings";
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
import AccountVerify from "./js/pages/auth/AccountVerify";
import Logistic from "./js/pages/register/Logistic";
import LogisticInformation from "./js/pages/register/LogisticInformation";
import LogisticsInformations from "./js/pages/account/LogisticsInformations";

function WebRoutes() {
  Aos.init();

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("/api/auth/is-authenticated");

        if (response.status === 200) {
          const data = response.data;
          setIsAuthenticated(data.isAuthenticated);
        } else {
          console.error("Erreur lors de la vérification de l'authentification");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification",
          error
        );
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const renderProtectedRoute = (element) => {
    return isAuthenticated === null ? null : isAuthenticated ? (
      element
    ) : (
      <Navigate to={`/login?_target_path=${location.pathname}`} />
    );
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/forget_password"
          element={isAuthenticated ? <Main /> : <ForgetPassword />}
        />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/login" element={isAuthenticated ? <Main /> : <Login />} />
        <Route
          path="/signup"
          element={isAuthenticated ? <Main /> : <Signup />}
        />
        <Route path="/account/tickets" element={<Tickets />} />
        <Route
          path="/account/events/:eventId/logistics_informations"
          element={<LogisticsInformations />}
        />
        <Route path="/account/settings" element={<Settings />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/response/:redirection/:type" element={<Response />} />
        <Route
          path="/register/:eventId/:numTickets"
          element={renderProtectedRoute(<Register />)}
        />
        <Route path="/register/logistic" element={<Logistic />} />
        <Route
          path="/register/logistic_informations"
          element={<LogisticInformation />}
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
        <Route path="/account-verify/:id" element={<AccountVerify />} />
      </Routes>
      <Footer />
    </>
  );
}

export default WebRoutes;
