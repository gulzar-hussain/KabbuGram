import express from 'express';
const router = express.Router();
import { check } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import {
    createComment,
    createPost,
    deleteComment,
    deletePostById,
    getAllPosts,
    getPostById,
    likePost,
    unlikePost,
} from '../controllers/postController.js';

// Post Checks
const postChecks = [check('text', 'Text is required').notEmpty()];

router.route('/').post(protect, postChecks, createPost).get(protect, getAllPosts);
router.route('/:id').get(protect, getPostById).delete(protect, deletePostById);
router.route('/:id/like').put(protect, likePost);
router.route('/:id/unlike').put(protect, unlikePost);
router.route('/:id/comment').post(protect, createComment);
router.route('/:id/comment/:commentId').delete(protect, deleteComment);

export default router;
