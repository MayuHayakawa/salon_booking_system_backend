import Booking from '../model/booking.js';

//get book info
const getBooking = async (req, res) => {
    const { id } = req.user // comes from authenticate middleware

    try {
        let booking = await Booking.find({ user: id });

        if(booking == []) {
            return res.status(400).json({
                message: 'No booking'
            })
        }

        res.status(200).json({ booking });

    } catch(error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
};

//add book
const addBooking = async (req, res) => {
    const { firstName, lastName, phoneNumber, staffId, menuId, startTime, endingTime } = req.body;
    const { id } = req.user // comes from authenticate middleware  
    console.log(startTime);

    try {
        let booking = await Booking.find({ user: id }); //array
        
        // ckeck if user has booking in same time
        if(booking.length !== 0) {
            let hasBookingConflict = false;

            booking.forEach((bookingItem) => {
                if(bookingItem.startTime < new Date(startTime) && bookingItem.endingTime > new Date(startTime)) {
                    hasBookingConflict = true;
                }
                if(bookingItem.startTime < new Date(endingTime) && bookingItem.endingTime > new Date(endingTime)) {
                    hasBookingConflict = true;
                }
            });

            if(hasBookingConflict) {
                return res.status(400).json({
                    message: 'there is booking at same time'
                })
            }
        }

        //check staff time?

        booking = new Booking({
            user: id,
            firstName,
            lastName,
            phoneNumber,
            staffId,
            menuId,
            startTime,
            endingTime
        });

        await booking.save();

        return res.status(200).json({
            booking
        })

    } catch(error) {
        return res. status(500).json({
            message: 'Server Error'
        })
    }
};

//updata book
const updataBooking = async (req, res) => {
    const { bookingid, staff, menu, startTime, endingTime } = req.body;
    const { id } = req.user;
    
    try {
        const booking = await Booking.find({ user: id }); //array
        
        // ckeck if user has booking in same time
        if(booking.length !== 0) {
            let hasBookingConflict = false;

            booking.forEach((bookingItem) => {
                if(bookingItem.startTime < new Date(startTime) && bookingItem.endingTime > new Date(startTime)) {
                    hasBookingConflict = true;
                }
                if(bookingItem.startTime < new Date(endingTime) && bookingItem.endingTime > new Date(endingTime)) {
                    hasBookingConflict = true;
                }
            });

            if(hasBookingConflict) {
                return res.status(400).json({
                    message: 'there is booking at same time'
                })
            }
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingid,
            {
                staff,
                menu,
                startTime,
                endingTime
            },
            { new: true }
        );

        return res.status(200).json({ updatedBooking });

    } catch(error) {
        return res.status(500).json({
            message: "Server error",
          });
    }
};

//delete book
const deleteBooking = async (req, res) => {
    const { id } = req.body;
    console.log(id);

    try {
        await Booking.findByIdAndDelete(id);

        return res.status(200).json({
            message: `Booking: ${id} is deleted`,
        })

    } catch(error) {
        return res.status(500).json({
            message: `Server error`,
        });
    }
};

export {
    getBooking,
    addBooking,
    updataBooking,
    deleteBooking,
}