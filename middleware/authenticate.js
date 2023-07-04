import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import Staff from '../model/staff.js';

const authenticate = async (req, res, next) => {
    const { token } = req.headers;

    if(!token) {
        return res.status(401).json({
            message: 'No token provided'
        })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if(error) {
            return res.status(403).json({
                message: 'Invalid token'
            });
        }

        const { _id } = decoded;

        if(decoded.user) {
            req.user = decoded.user;
            // req.user = User.findById(_id).select('-password');
        } else if(decoded.staff) {
            req.staff = decoded.staff;
            // req.staff = Staff.findById(_id).select('password');
        }
        next();
    });

};

export { authenticate }