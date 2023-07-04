import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

//batabase connection
import "./config/db.js";

//import routes
import authRoute from './route/auth.js';
import userRoute from './route/user.js';
import staffRoute from './route/staff.js';
import menuRoute from './route/menu.js';
import bookingRoute from './route/booking.js';
import scheduleRoute from './route/staffschedule.js';
import { authenticate } from "./middleware/authenticate.js";

// initialize express app
const server = express();

//middlewares
server.use(cors()); //Cross-Origin Resource Sharing
server.use(bodyParser.json({ limit: "3mb", extended: true })); //limit: default is 100kb, extended: true makes req.body array

//routes
server.use('/api/auth', authRoute);
server.use('/api/user', userRoute);
server.use('/api/staff', staffRoute);
server.use('/api/menu', menuRoute);
server.use('/api/booking', bookingRoute);
server.use('/api/schedule', scheduleRoute);

//test
server.get('/protected', authenticate, (req, res) => {
    res.status(200).json({
        message: 'Protected route'
    });
});

//listen ro port
server.listen(process.env.PORT, () => {
    console.log(`This server listening on port: #${process.env.PORT}`);
})

