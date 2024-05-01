import express from 'express';
import { check } from 'express-validator';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';

import {
    getCurrProfile,
    updateProfile,
    getAllProfiles,
    getUserProfile,
    updateExperience,
    deleteExperience,
    updateEducation,
    deleteEducation,
} from '../controllers/profileController.js';

// Checks when you create/update profile
const profileChecks = [
    check('bio', 'Bio is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
];

// Checks for adding experience
const experienceChecks = [
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From Date is required').notEmpty(),
];

// Checks for adding education
const educationChecks = [
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of Study is required').notEmpty(),
    check('from', 'From Date is required').notEmpty(),
];

router.route('/').get(protect, getAllProfiles).post(protect, profileChecks, updateProfile);
router.route('/me').get(protect, getCurrProfile);
router.route('/experience').put(protect, experienceChecks, updateExperience);
router.route('/experience/:expId').delete(protect, deleteExperience);
router.route('/education').put(protect, educationChecks, updateEducation);
router.route('/education/:eduId').delete(protect, deleteEducation);
router.route('/user/:userId').get(protect, getUserProfile);

export default router;
