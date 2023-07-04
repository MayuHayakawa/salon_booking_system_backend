import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import Staff from '../model/staff.js';
import { hashPassword, comparePassword } from '../Util/passwordUtil.js';
import { generateAccessToken, generateRefreshToken } from '../Util/jwtUtil.js';

//register
const userRegister = async (req, res) => {   
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        
        if(user) {
            return res.status(400).json({
                message: 'User already exists with this email'
            });
        };
        
        const hashedPassword = await hashPassword(password);
        
        user = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        const payload = {
            user: {
                id: user.id,
            }
        }
        // console.log(payload);

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        user.refreshToken = refreshToken;

        await user.save();

        return res.status(200).json({
            accessToken,
            refreshToken
        })

    } catch(error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}

const staffRegister = async (req, res) => {
    const { staffName, email, password, bio } = req.body;
    // const { staffName, email, password, bio, avatar } = req.body;

    try {
        let staff = await Staff.findOne({ email });
        
        if(staff) {
            return res.status(400).json({
                message: 'User already exists with this email'
            });
        };
        
        const hashedPassword = await hashPassword(password);
        
        staff = new Staff({
            staffName,
            email,
            password: hashedPassword,
            bio,
            // avatar
        });

        const payload = {
            staff: {
                id: staff.id,
            }
        }
        // console.log(payload);

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        staff.refreshToken = refreshToken;

        await staff.save();

        return res.status(200).json({
            accessToken,
            refreshToken
        })

    } catch(error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}


//login
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        const isPasswordCorrect = comparePassword(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const payload = {
            user: {
                id: user.id,
            }
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        user.refreshToken = refreshToken;

        await user.save();

        return res.status(200).json({
            accessToken,
            refreshToken
        });

    } catch(error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}

const staffLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const staff = await Staff.findOne({ email });

        if(!staff) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        const isPasswordCorrect = comparePassword(password, staff.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const payload = {
            staff: {
                id: staff.id,
            }
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        staff.refreshToken = refreshToken;

        await staff.save();

        return res.status(200).json({
            accessToken,
            refreshToken
        });

    } catch(error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}


//logout
// const logout = async (req, res) => {
// }

//refresh
const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if(!refreshToken) {
        return res.status(401).json({
            message: 'No refresh token provided'
        });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY_REFRESH, (error, decoded) => {
        if(error) {
            return res.status(403).json({
                message: 'Invalid refresh token'
            });
        }

        try {

            if(decoded.user !== undefined) {
                const payload = {
                    user: {
                        id: decoded.user.id
                    }
                }
                const token = generateAccessToken(payload);
                return res.status(200).json({ token });
            }

            if(decoded.staff !== undefined) {
                const payload = {
                    staff: {
                        id: decoded.staff.id,
                    }
                }
                const token = generateAccessToken(payload);
                return res.status(200).json({ token });
            }

        } catch(error) {
            return res.status(500).json({
                message: "Server error",
                error: error.message
            });
        }
    });
}

export {
    userRegister,
    staffRegister,
    userLogin,
    staffLogin,
    // logout,
    refresh,
}

