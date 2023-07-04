import jwt from 'jsonwebtoken';

const generateAccessToken = (id) => {
    return jwt.sign(
        id,
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
}

const generateRefreshToken = (id) => {
    return jwt.sign(
        id,
        process.env.JWT_SECRET_KEY_REFRESH,
        { expiresIn: '1d' }
    );
}

const verifyToken = async (token) => {
    return await jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
    );
}

export { generateAccessToken, generateRefreshToken, verifyToken };