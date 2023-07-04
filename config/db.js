import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let db = mongoose.connect(process.env.MONGO_URI, {
    // https://mongoosejs.com/docs/migrating_to_6.html
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log("DB connected");
}).catch((error) => {
    console.log(error);
    console.log("Error in DB connection");
});

export default db;