import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        requires: true,
    },
    phoneNumber: {
        type: Number,
        unique: true,
        requires: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String
    },
});

const User = model("User", userSchema);
export default User;