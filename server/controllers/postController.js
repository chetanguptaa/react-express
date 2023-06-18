const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
const logger = require('../utils/logger');

const createPost =  async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await UserModel.findById(userId);
        const newPost = new PostModel({
            userId,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();
        const post = await PostModel.find();
        res.status(201).json(post);
    } catch ( e ) {
        logger.error(e);
        res.status(409).json(e.message)
    }
}

const getFeedPosts = async (req, res) => {
    try {
        const post = await PostModel.find();
        res.status(200).json(post);
    } catch ( e ) {
        res.status(404).send(e.message);
    }
};

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await PostModel.find({
            userId
        });
        res.status(200).json(post);
    } catch (e) {
        res.status(404).send(e.message);
    }
};

const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await PostModel.findById(id);
        const isLiked = post.likes.get(userId);
        if(isLiked) post.likes.delete(userId);
        else post.likes.set(userId, true);
        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
          );
      
          res.status(200).json(updatedPost);
    } catch (e) {
        logger.error(e);
        res.status(404).send(e.message);
    }
};

module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost
}