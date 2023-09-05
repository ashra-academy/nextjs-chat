import { connectMongoDB } from '@/lib/configuration/mongoodb'
import { NextResponse } from 'next/server'
import User from '@/lib/models/userModel'
import {
  generateOTP,
  isOtpValid,
  createOtpExpirationTime,
  chechResendOtpIfBelow10minutes,
  chechResendOtpIfUp10minutes
} from '@/lib/utils/otpController'

export async function POST(request: Request) {
  await connectMongoDB()
  const { email, otpvalue } = await request.json()
  if (otpvalue && email) {
    let user = await User.findOne({ email: email })
    if (user) {
      if (isOtpValid(String(user?.updatedAt))) {
        if (user?.otp == otpvalue) {
          return NextResponse.json(
            {
              message: 'Successfully verified via email otp',
              request: JSON.stringify(user)
            },
            { status: 202 }
          )
        } else {
          return NextResponse.json(
            { message: 'Otp not correct'},
            { status: 401 }
          )
        }
      } else {
        return NextResponse.json(
          { message: 'Otp expired'},
          { status: 498 }
        )
      }
    }
    return NextResponse.json(
      {
        message: 'Could not find user, Please register first.',
      },
      { status: 401 }
    )
  }
  if (email) {
    let user = await User.findOne({ email: email })
    let otp = generateOTP()
    if (user) {
      if (chechResendOtpIfBelow10minutes(String(user.otpExpirationTime))) {
        return NextResponse.json(
          { message: 'Otp already sent.',  otpStatus: 'already sent'},
          { status: 409 }
        )
      }
      if (chechResendOtpIfUp10minutes(String(user.otpExpirationTime))) {
        return NextResponse.json(
          { message: 'Otp already sent.', otpStatus: 'resend'},
          { status: 409 }
        )
      }
      user.otp = otp
      user.otpExpirationTime = createOtpExpirationTime()
      user.save()
      return NextResponse.json(
        { message: 'Otp sent. Check your email.', otpStatus: 'sent'},
        { status: 200 }
      )
    } else {
      let newUser = await User.create({ email: email, otp: otp })
      return NextResponse.json(
        { message: 'Otp sent. Verify your email.', otpStatus: 'sent', request: JSON.stringify(newUser) },
        { status: 201 }
      )
    }
  }
}
