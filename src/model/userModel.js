import { verify } from "crypto";
import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"plz provide a user name"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false, 
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

});


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;