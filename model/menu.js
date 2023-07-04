import { Schema, model } from "mongoose";

const menuSchema = new Schema({
    menuname: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, //min
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Menu = model("Menu", menuSchema);
export default Menu;