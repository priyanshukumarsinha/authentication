import { verify } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    email : {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiry : {
        type: Date
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpiry : {
        type: Date
    }
});

// export the model
const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
