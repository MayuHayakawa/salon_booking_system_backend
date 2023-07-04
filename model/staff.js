import { Schema, model } from 'mongoose';

const staffSchema = new Schema({
    staffName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        required: true,
        type: String,
    },
    bio: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    booked: [{
        type: Schema.Types.ObjectId,
        ref: "Book",
    }],
    registeredAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    refreshToken: {
        type: String,
    },
});

const Staff = model("Staff", staffSchema);
export default Staff;