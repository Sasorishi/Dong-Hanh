import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Toast from '@/components/ToastComponent'
import Stepper from '@/components/register/StepperComponent'
import Loader from '@/components/LoaderComponent'

const ConfirmEventAttendance = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [event, setEvent] = useState(null)
  const [numTickets, setNumTickets] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!location.state) {
      navigate('/', { replace: true })
    } else {
      setLoading(false)
    }

    const getEvent = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `/api/events/${location.state.eventId}/getData`
        )

        if (response.status === 200) {
          const data = response.data
          setEvent(data.event)
          setNumTickets(location.state.numTickets)
        } else {
          setEvent([])
          setError('Error call api request')
        }
      } catch (error) {
        setEvent([])
        setError('Error call api request')
      } finally {
        setLoading(false)

        setTimeout(() => {
          closeToast()
        }, 5000)
      }
    }

    getEvent()
  }, [location.state, navigate])

  const closeToast = () => setError(null)

  const setParticipants = async () => {
    try {
      if (!event || numTickets === null) {
        throw new Error('Missing event data')
      }

      const combinedData = {
        eventId: event.id,
        numTickets: numTickets,
        participants: location.state.ticketsData, // Assurez-vous d'ajouter ici les participants réels
        isOnline: location.state?.isOnline,
      }

      const response = await axios.post('/api/register/public', combinedData)
      console.log(response)
      if (response.status === 200 || response.status === 201) {
        console.log('Request success!')
        return true
      } else {
        throw new Error('Server request failed')
      }
    } catch (error) {
      console.error('Error setting participants:', error)
      setError('An error occurred. Please try again.')
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const success = await setParticipants()
    if (success) {
      navigate('/response/success/checkout', { replace: true })
    } else {
      setLoading(false)
    }
  }

  return (
    <section className="bg-whitesmoke py-16 px-32">
      <Stepper currentStep={2} isOnline={location.state?.isOnline} />
      {error && <Toast message={error} onClose={closeToast} error />}
      {loading ? (
        <Loader />
      ) : (
        <div className="py-24 sm:py-32 px-6 lg:px-8 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mt-6 space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Event Registration Confirmation
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  By confirming on this page, you officially confirm your
                  attendance at the event.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="animation-hover uppercase flex align-center leading-6 text-gray-900 text-center font-medium hover:text-bordeau"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                    />
                  </svg>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="animation-hover flex align-center text-white uppercase rounded-full bg-darkblue px-4 py-2 text-center font-medium shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-darkblue disabled:opacity-25"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}

export default ConfirmEventAttendance
