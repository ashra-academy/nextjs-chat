import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true,
        default: "000000",
    },
    otpExpirationTime: {
        type: Date,
        required: true,
        default: Date.now(),
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
export default User