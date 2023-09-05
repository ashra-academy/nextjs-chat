'use client'
import SignInEmail from '@/components/SignInEmail'
import SignInOtp from '@/components/SignInOtp'
import { useState } from 'react'

const page = () => {
  const [emailSubmit, setEmailSubmit] = useState(false)
  const manageEmailSubmit = ():void => {
    setEmailSubmit(true)
  }
  return (
    <div className="flex screen-h-without-header justify-center items-center">
      {!emailSubmit ? (
        <SignInEmail manageEmailSubmit={manageEmailSubmit} />
      ) : (
        <SignInOtp />
      )}
    </div>
  )
}

export default page
