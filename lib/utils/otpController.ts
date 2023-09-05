import otpGenerator from 'otp-generator'

// The OTP_LENGTH is a number, For my app i selected 10.
const OTP_LENGTH = 6
// The OTP_CONFIG is an object that looks like
const OTP_CONFIG = {
  digits: true,
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false
}
const otpExpirationMinutes = 20
export const generateOTP = (): string => {
  return String(otpGenerator.generate(OTP_LENGTH, OTP_CONFIG))
}
export const isOtpValid = (otpPasswordExpiresAt: string) => {
  const currentDateTime = new Date()
  const otpExpiresAt = new Date(otpPasswordExpiresAt)
  // console.log('expire at: ',otpExpiresAt, ', current time: ', currentDateTime)
  return otpExpiresAt > currentDateTime
}
export const chechResendOtpIfBelow10minutes = (
  otpPasswordExpiresAt: string
) => {
  const currentDateTime = new Date()
  const otpExpiresAt = new Date(otpPasswordExpiresAt)
  otpExpiresAt.setMinutes(
    otpExpiresAt.getMinutes() - (otpExpirationMinutes - 10)
  )
  return otpExpiresAt > currentDateTime
}
export const chechResendOtpIfUp10minutes = (otpPasswordExpiresAt: string) => {
  const currentDateTime = new Date()
  const otpExpiresAt = new Date(otpPasswordExpiresAt)
  otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10)
  return otpExpiresAt > currentDateTime
}
export const createOtpExpirationTime = () => {
  const otpExpiresAt = new Date()
  // console.log('expire at: ',otpExpiresAt)
  otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + otpExpirationMinutes)
  return otpExpiresAt
}
