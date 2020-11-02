import express from 'express';
const router = express.Router();
import {
    authUser,
    getUserProfile,
    registerUser,
    updateProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateProfile);
router
    .route('/:id')
    .delete(protect, isAdmin, deleteUser)
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUser);

export default router;
