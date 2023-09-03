import otpGenerator from 'otp-generator'


// The OTP_LENGTH is a number, For my app i selected 10.
const OTP_LENGTH = 4
// The OTP_CONFIG is an object that looks like 
const OTP_CONFIG = {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
}
export const otpExpirationMinutes = 10;
export const generateOTP = ():string => {
    return otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
};
export const isOtpValid = (otpPasswordExpiresAt: string) => {
    const currentDateTime = new Date();
    const otpExpiresAt = new Date(otpPasswordExpiresAt);
    console.log(otpExpiresAt, ",", currentDateTime);
    return otpExpiresAt > currentDateTime;
}
export const chechResendOtpIfBelow2minutes = (otpPasswordExpiresAt: string) => {
    const currentDateTime = new Date();
    const otpExpiresAt = new Date(otpPasswordExpiresAt);
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() - (otpExpirationMinutes - 2));
    return otpExpiresAt > currentDateTime;
}
export const chechResendOtpIfUp2minutes = (otpPasswordExpiresAt: string) => {
    const currentDateTime = new Date();
    const otpExpiresAt = new Date(otpPasswordExpiresAt);
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 2);
    return otpExpiresAt > currentDateTime;
}
export const createOtpExpirationTime = () => {
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + otpExpirationMinutes);
    return otpExpiresAt
}