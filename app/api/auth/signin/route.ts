import { connectMongoDB } from '@/lib/configuration/mongoodb'
import {
  chechResendOtpIfBelow10minutes,
  chechResendOtpIfUp10minutes,
  createOtpExpirationTime,
  generateOTP
} from '@/lib/utils/otpController'
import { transporter } from '@/lib/utils/email sender/otp-email-config'
import { formatedOtpEmail } from '@/lib/utils/formated-email'
import { NextResponse } from 'next/server'
import User from '@/lib/models/userModel'

export async function POST(req: Request) {
  await connectMongoDB()
  let otp = generateOTP()
  const json = await req.json()
  const user = await User.findOne({ email: json?.email })
  if (user) {
    if (chechResendOtpIfBelow10minutes(String(user.updatedAt))) {
      return NextResponse.json(
        {
          message: 'Check your email for otp. We already sent otp.',
          otpStatus: 'already sent'
        },
        { status: 200 }
      )
    }
    transporter.sendMail({
      from: process.env.EMAIL_ADDRESS, // sender address
      to: json.email, // list of receivers
      subject: 'Your login otp ✔', // Subject line
      html: formatedOtpEmail(user.otp) // html body
    })
    user.otp = otp
    user.otpCreationTime = new Date()
    user.otpExpirationTime = createOtpExpirationTime()
    await user.save()
    return NextResponse.json(
      { message: 'Otp resend successfully' },
      { status: 200 }
    )
  }

  await User.create({
    email: json.email,
    otp: otp,
    otpCreationTime: new Date(),
    otpExpirationTime: createOtpExpirationTime()
  })
  transporter.sendMail({
    from: process.env.EMAIL_ADDRESS, // sender address
    to: json.email, // list of receivers
    subject: 'Your login otp ✔', // Subject line
    html: formatedOtpEmail(otp) // html body
  })
  return NextResponse.json(
    { message: 'Otp Email sent successfully' },
    { status: 200 }
  )
}
