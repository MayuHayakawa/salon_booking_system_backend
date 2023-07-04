import Staff from '../model/staff.js';

const getAllStaff = async (req, res) => {
    const allStaff = await Staff.find();

    res.status(200).json({ allStaff });
}

//get staff info
const getStaffProfile = async (req, res) => {
    const { id } = req.staff // comes from authenticate middleware

    let staff = await Staff.findById(id).select('-password');

    res.status(200).json({ staff });
};

//updata staff info
const updateStaffProfile = async (req, res) => {
    const { id, staffName, email, bio } = req.body;
    // const { staffName, email, bio, avatar } = req.body;
    // const { id } = req.staff // comes from authenticate middleware

    try {
        
        const staff = await Staff.findByIdAndUpdate(id, {
            staffName,
            email,
            bio,
            // avatar,
            updatedAt: Date.now()
        }, { new: true });

        return res.status(200).json({ staff });

    } catch(error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
};

const deleteStaffProfile = async (req, res) => {
    const { id } = req.body; //POST request

    console.log(id);

    try {
        await Staff.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'this staff is deleted'
        })
    } catch(error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export {
    getAllStaff,
    getStaffProfile,
    updateStaffProfile,
    deleteStaffProfile
}