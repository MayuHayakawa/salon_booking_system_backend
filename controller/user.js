import User from '../model/user.js';

//get user info
const getUserProfile = async (req, res) => {
    const { id } = req.user // comes from authenticate middleware
    
    let user = await User.findById(id).select('-password');

    res.status(200).json({ user });
};

//updata user info
const updateUserProfile = async (req, res) => {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const { id } = req.user; // comes from authenticate middleware

    try {
        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            phoneNumber
        }, { new: true });

        return res.status(200).json({ user });
        
    } catch(error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
};

export {
    getUserProfile,
    updateUserProfile
}