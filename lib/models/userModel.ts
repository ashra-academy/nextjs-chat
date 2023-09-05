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
    otpCreationTime: {
        type: Date,
        required: true,
        default: new Date(),
    },
    otpExpirationTime: {
        type: Date,
        required: true,
        default: new Date(),
    }
}, {
    timestamps: true
})

const User =  mongoose.models.User || mongoose.model("User", userSchema)
export default User