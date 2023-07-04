import Booking from '../model/booking.js';

//get book info
const getSchedule = async (req, res) => {
    const { id } = req.body

    try {
        let schedule = await Booking.find({ staff: id });

        if(schedule == []) {
            return res.status(400).json({
                message: 'No booking'
            })
        }

        res.status(200).json({ schedule });

    } catch(error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
};


//add book
const addSchedule = async (req, res) => {
    const { user, firstName, lastName, phoneNumber, staff, menu, startTime, endingTime } = req.body; 

    try {
        let schedule = await Booking.find({ staff }); //array
        
        // ckeck if user has booking in same time
        if(schedule.length !== 0) {
            let hasScheduleConflict = false;

            schedule.forEach((scheduleItem) => {
                if(scheduleItem.startTime < new Date(startTime) && scheduleItem.endingTime > new Date(startTime)) {
                    hasScheduleConflict = true;
                }
                if(scheduleItem.startTime < new Date(endingTime) && scheduleItem.endingTime > new Date(endingTime)) {
                    hasScheduleConflict = true;
                }
            });

            if(hasScheduleConflict) {
                return res.status(400).json({
                    message: 'there is booking at same time'
                })
            }
        }

        //check staff time?

        schedule = new Booking({
            user,
            firstName,
            lastName,
            phoneNumber,
            staff,
            menu,
            startTime,
            endingTime
        });

        await schedule.save();

        return res.status(200).json({
            schedule
        })

    } catch(error) {
        return res. status(500).json({
            message: 'Server Error'
        })
    }

};


//updata book
const updataSchedule = async (req, res) => {
    const { bookingid, staff, menu, startTime, endingTime } = req.body;
    
    try {
        const schedule = await Booking.find({ staff: staff }); //array
        
        // ckeck if user has booking in same time
        if(schedule.length !== 0) {
            let hasScheduleConflict = false;

            schedule.forEach((scheduleItem) => {
                if(scheduleItem.startTime < new Date(startTime) && scheduleItem.endingTime > new Date(startTime)) {
                    hasScheduleConflict = true;
                }
                if(scheduleItem.startTime < new Date(endingTime) && scheduleItem.endingTime > new Date(endingTime)) {
                    hasScheduleConflict = true;
                }
            });

            if(hasScheduleConflict) {
                return res.status(400).json({
                    message: 'there is booking at same time'
                })
            }
        }

        

        const updatedSchedule = await Booking.findByIdAndUpdate(
            bookingid,
            {
                staff,
                menu,
                startTime,
                endingTime
            },
            { new: true }
        );

        return res.status(200).json({ updatedSchedule });

    } catch(error) {
        return res.status(500).json({
            message: "Server error",
          });
    }
};

//delete book
const deleteSchedule = async (req, res) => {
    const { bookingid } = req.body;

    try {
        await Booking.findByIdAndDelete(bookingid);

        return res.status(200).json({
            message: `Booking: ${bookingid} is deleted`,
        })

    } catch(error) {
        return res.status(500).json({
            message: `Server error`,
        });
    }
};

export {
    getSchedule,
    addSchedule,
    updataSchedule,
    deleteSchedule
}