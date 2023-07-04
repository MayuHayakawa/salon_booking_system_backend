import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        staffId: {
            type: Schema.Types.ObjectId,
            ref: "Staff",
        },
        menuId: {
            type: Schema.Types.ObjectId,
            ref: "Menu",
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endingTime: {
            type: Date,
            required: true,
        },
    },
    // {
    //     toJSON: {
    //         transform: (doc, ret) => {
    //             ret.startTime = ret.startTime.toISOString();
    //             ret.endingTime = ret.endingTime.toISOString();
    //             return ret;
    //         },
    //     },
    // }
);

const Booking = model("Booking", bookingSchema);
export default Booking;