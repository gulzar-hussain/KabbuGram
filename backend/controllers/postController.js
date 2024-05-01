import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';
import Post from '../models/postModel.js';

// @desc    Create a Post
// @route   POST api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });
        if (req.body.image) newPost.image = req.body.image;

        const post = await newPost.save();

        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @desc    Get all Posts
// @route   GET api/posts
// @access  Private
const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @desc    Get Post by ID
// @route   GET api/posts/:id
// @access  Private
const getPostById = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @desc    Delete Post by ID
// @route   DELETE api/posts/:id
// @access  Private
const deletePostById = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if User owns the Post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();

        res.json({ msg: 'Post removed' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @desc    Like a Post
// @route   PUT api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if post already liked
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @desc    Like a Post
// @route   PUT api/posts/:id/like
// @access  Private
const unlikePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if post already liked
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @desc    Create a Comment on a Post
// @route   POST api/posts/:id/comment
// @access  Private
const createComment = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @desc    Delete Comment from a Post by ID
// @route   DELETE api/posts/:id/comment/:commentId
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Pull out comment
        const comment = post.comments.find((comment) => comment.id === req.params.commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check if User owns the comment
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // remove comment
        post.comments = post.comments.filter(({ id }) => id !== req.params.commentId);

        await post.save();

        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

export {
    createPost,
    getAllPosts,
    getPostById,
    deletePostById,
    likePost,
    unlikePost,
    createComment,
    deleteComment,
};
