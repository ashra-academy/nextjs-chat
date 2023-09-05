import React, { useContext, useState } from 'react'
import {
  LogedInEmailContext,
  LogedInUserContext
} from './contextapis/auth-context'

const signinOtp = () => {
  const [otp, setOtp] = useState('')
  const { logedInEmail } = useContext<any>(LogedInEmailContext)
  const { setLogInUser } = useContext<any>(LogedInUserContext)
  const [filledOTP, setFilledOTP] = useState(true)
  const [invalidOTP, setInvalidOTP] = useState(true)
  const manageOtpSubmit = async () => {
    setInvalidOTP(false)
    if (otp === '' || otp.length < 6 || otp.length > 6) {
      setFilledOTP(false)
    } else {
      setFilledOTP(true)
      try {
        const rawResponse = await fetch('api/auth/verifyotp', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: logedInEmail, otp: otp })
        })
        const content = await rawResponse.json()
        if(content.otpStatus === 'verified'){
          setLogInUser({...content?.session})
          localStorage.setItem('botsession', JSON.stringify(content?.session))
        }
      } catch (error) {
        setFilledOTP(true)
        console.log(error)
      }
    }
  }
  return (
    <div>
      {!filledOTP ? (
        <div
          id="toast-interactive"
          className="max-w-xs p-4 mb-2 text-gray-500 bg-red-700 rounded-lg shadow dark:bg-red-500 dark:text-gray-400"
          role="alert"
        >
          <div className="text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              Please 6 charecter length otp.
            </span>
          </div>
        </div>
      ):''}
      {!invalidOTP ? (
        <div
          id="toast-interactive"
          className="max-w-xs p-4 mb-2 text-gray-500 bg-red-700 rounded-lg shadow dark:bg-red-500 dark:text-gray-400"
          role="alert"
        >
          <div className="text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              The otp you entered is not valid.
            </span>
          </div>
        </div>
      ):''}
      <div className="w-[300px]">
        <div className="mb-6">
          <label
            htmlFor="otp"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            We have sent an otp to your email address. Enter your otp.
          </label>
          <input
            type="text"
            id="otp"
            onChange={e => setOtp(e.target.value)}
            className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <button
          type="submit"
          onClick={manageOtpSubmit}
          className="inline-flex items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-md hover:bg-primary/90  font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
        >
          Sign In
        </button>
      </div>
    </div>
  )
}

export default signinOtp
