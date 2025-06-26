import React, { useState, useEffect } from 'react'
import { Button, Flex, Input, Typography } from 'antd'
import Toast from '@/components/ToastComponent'
import axios from 'axios'

const AccountVerify = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(null)
  const [verified, setVerified] = useState(false)

  const url = new URL(window.location.href)
  let id = url.pathname.split('/').filter(Boolean).pop()

  const closeToast = () => {
    setError(null)
    setSuccess(null)
  }

  const handleAccountVerify = async (code) => {
    try {
      setLoading(true)
      const data = {
        code: code,
      }

      const response = await axios.post(`/api/auth/account-verify/${id}`, data)
      if (response.data.success !== false) {
        setVerified(true)
      } else {
        setError(`Error : ${response.data.message}.`)

        setTimeout(() => {
          closeToast()
        }, 5000)
      }
    } catch (error) {
      // console.error("Server request fail.", error);
      setError('Error signup')

      setTimeout(() => {
        closeToast()
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    const response = await axios.post(`/api/auth/account-verify/resend/${id}`)
    if (response.data.success !== false) {
      setSuccess('Email sent successfully.')
    } else {
      setError(`Error : ${response.data.message}.`)
    }
  }

  const onChange = (text) => {
    handleAccountVerify(text)
  }

  const sharedProps = {
    onChange,
  }

  useEffect(() => {
    handleResendEmail()
  }, [])

  return (
    <section className="py-16 px-32">
      {error && <Toast message={error} onClose={closeToast} error={true} />}
      {success && (
        <Toast message={success} onClose={closeToast} error={false} />
      )}
      {verified ? (
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-whitesmoke rounded-lg shadow-md">
          <div className="flex flex-col text-center justify-center mx-auto">
            <h2 className="mt-3">Verify your account</h2>
          </div>
          <div className="mt-6">
            <p className="text-center mb-6">Your email is verified</p>
            <a href="/" className="text-darkblue text-center block">
              Go to homepage
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-whitesmoke rounded-lg shadow-md">
          <div className="flex flex-col text-center justify-center mx-auto">
            <h2 className="mt-3">Verify your account</h2>
          </div>
          <p className="text-base text-darkblue text-center mb-6">
            Enter the code you have <br /> received by email
          </p>
          <div className="text-center">
            <Input.OTP className="otp" length={6} {...sharedProps} />
          </div>
          <p className="text-darkblue text-center mt-6">
            If you have not received it, <br /> click on the link below
          </p>
          <button
            type="button"
            onClick={() => handleResendEmail()}
            className="animation-hover hover:underline mt-8 flex justify-self-center items-center uppercase text-darkblue hover:text-bordeau font-medium rounded-full text-sm px-4 py-2 text-center"
          >
            Resend me an email
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

export default AccountVerify
