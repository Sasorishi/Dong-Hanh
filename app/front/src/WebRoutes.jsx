import React, { useEffect, useState } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'

import Aos from 'aos'
import axios from 'axios'

import Navbar from '@/components/layout/NavbarLayout'
import Footer from '@/components/layout/FooterLayout'

import Main from '@/pages/homepage/App'
import Login from '@/pages/auth/Login'
import Signup from '@/pages/auth/Signup'
import Tickets from '@/pages/account/Tickets'
import Settings from '@/pages/account/Settings'
import Events from '@/pages/events/Events'
import EventDetail from '@/pages/events/EventDetail'
import Response from '@/pages/responses/response'
import Register from '@/pages/register/Register'
import Checkout from '@/pages/checkout/Checkout'
import ForgetPassword from '@/pages/auth/ForgetPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import Introduction from '@/pages/homepage/Introduction'
import About from '@/pages/homepage/About'
import PrivacyPolicy from '@/pages/homepage/PrivacyPolicy'
import TermsAndConditionsOfSale from '@/pages/homepage/TermsAndConditionsOfSale'
import AccountVerify from '@/pages/auth/AccountVerify'
import Logistic from '@/pages/register/Logistic'
import LogisticInformation from '@/pages/register/LogisticInformation'
import ConfirmEventAttendance from '@/pages/checkout/ConfirmEventAttendance'

function WebRoutes() {
  Aos.init()

  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('/api/auth/is-authenticated')

        if (response.status === 200) {
          const data = response.data
          setIsAuthenticated(data.isAuthenticated)
        } else {
          console.error("Erreur lors de la vérification de l'authentification")
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification",
          error
        )
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuthentication()
  }, [])

  const renderProtectedRoute = (element) => {
    return isAuthenticated === null ? null : isAuthenticated ? (
      element
    ) : (
      <Navigate to={`/login?_target_path=${location.pathname}`} />
    )
  }

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
        <Route
          path="/register/confirm_attendance"
          element={<ConfirmEventAttendance />}
        />
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
  )
}

export default WebRoutes
