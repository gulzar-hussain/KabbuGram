import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if there's no token
    if (!token) {
        return res.status(401).json({ msg: 'No token found, authorization denied' });
    }

    // Verify token and set user to req
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid Token' });
    }
});

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorised as an Admin');
    }
};

export { protect, isAdmin };
