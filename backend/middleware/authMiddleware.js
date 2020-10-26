import jwt from 'jsonwebtoken';
import Users from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import 'colors';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Users.findById(decodedToken.id).select(
                '-password'
            );

            next();
        } catch (error) {
            console.log(`Error: ${error}`.red);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('No token. Unauthorized');
    }
});

export default protect;
