import React, { useContext, useState } from 'react'
import { LogedInEmailContext } from './contextapis/auth-context'
import { toast } from 'react-hot-toast'
const SignInEmail = ({ manageEmailSubmit }: any) => {  
  // login email state
  const { setLogInEmail } = useContext<any>(LogedInEmailContext)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  // response content
  let content: any = ''
  let mailformat: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  function validateEmail(mail: string): boolean {
    if (mailformat.test(mail)) {
      setValidEmail(false)
      return true
    }
    setValidEmail(true)
    return false
  }
  // handle submit email address
  const submitEmail = async () => {
    if (validateEmail(email)) {
      try {
        setLogInEmail(email)
        const rawResponse = await fetch('api/auth/signin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email })
        })
        content = await rawResponse.json()
        // console.log('content: ',content)
        toast.success('Otp sent successfully')
        manageEmailSubmit()
        return
      } catch (error) {
        console.log("error: ",error)
        toast.error(content?.message)
        return
      }
    }
    console.log('email not valid')
  }

  return (
    <div>
      <div className="w-[300px]">
        {validEmail ? (
          <div
            id="toast-interactive"
            className="max-w-xs p-4 mb-2 text-gray-500 bg-red-700 rounded-lg shadow dark:bg-red-500 dark:text-gray-400"
            role="alert"
          >
            <div className="text-sm font-normal">
              <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                You have entered invalid email address.
              </span>
            </div>
          </div>
        ):''}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            submitEmail()
          }}
          className="inline-flex items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-md hover:bg-primary/90  font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
        >
          Get OTP
        </button>
      </div>
    </div>
  )
}

export default SignInEmail
