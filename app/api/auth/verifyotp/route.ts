import { connectMongoDB } from '@/lib/configuration/mongoodb'
import User from '@/lib/models/userModel'
import { isOtpValid } from '@/lib/utils/otpController'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  await connectMongoDB()
  const json = await req.json()
  const user = await User.findOne({ email: json?.email })
  // console.log('otp post ', json, user)
  // console.log('is valid', isOtpValid(String(user.otpExpirationTime)))
  if (
    user &&
    json?.otp == user?.otp &&
    isOtpValid(String(user.otpExpirationTime))
  ) {
    return NextResponse.json(
      {
        session: { _id: user._id, email: user.email },
        message: 'Successfully verified email.',
        otpStatus: 'verified'
      },
      { status: 200 }
    )
  }

  return NextResponse.json(
    { message: 'Invalid otp, Check your email for otp.', otpStatus: 'invalid' },
    { status: 400 }
  )
}
