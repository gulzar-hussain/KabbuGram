import express from 'express';
import { check } from 'express-validator';
import {
    deleteUser,
    registerUser,
    getUser,
    getUsers,
    loginUser,
    getUserById,
} from '../controllers/userController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

// User Express Router
const router = express.Router();

// Checks
const validationChecksRegister = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

// Checks
const validationChecksLogin = [
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password is required').exists(),
];

router.route('/').post(validationChecksRegister, registerUser).get(protect, isAdmin, getUsers);

router.route('/login').post(validationChecksLogin, loginUser);
router.route('/me').get(protect, getUser);

router.route('/:userId').delete(protect, isAdmin, deleteUser).get(protect, isAdmin, getUserById);
//     .put(protect, isAdmin, updateUser);

export default router;
