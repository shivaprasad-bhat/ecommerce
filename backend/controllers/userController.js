import Users from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

/**
 * @description Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await Users.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await Users.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201);
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

/**
 * @description Auth the user & get a token
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email / Password');
    }
});

/**
 * @description Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * @description Udpate user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateProfile = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.user.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { authUser, getUserProfile, registerUser, updateProfile };
