const logger = require('../utils/logger');
const { createUser } = require('../services/userService');
const UserModel = require('../models/userModel');
const { generateAccessToken,generateRefreshToken } = require('../middleware/authentication');


const createUserHandler = async (req, res) => {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (e) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}

const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Here, you can generate a token or session to maintain the user's authenticated state
        const accessToken = generateAccessToken({ userId: user._id });
        const refreshToken = generateRefreshToken({ userId: user._id });
        res.json({accessToken, refreshToken, redirectUrl: '/me'});
        // res.redirect(`/me?access_token=${accessToken}`);
    } catch (e) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        res.status(200).json(user);
    } catch (e) {
        logger.error(e);
        return res.status(404).send(e.message);
    }
}

const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => UserModel.findById(id))
        );
        const formattedFriends = friends.map(
            ({
                _id, email, picturePath
            }) => {
                return { _id, email, picturePath }
            }
        );
        res.status(200).json(formattedFriends)
    } catch (e) {
        logger.error(e);
        return res.status(404).send(e.message);
    }
};

const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendsId } = req.params;
        const user = await UserModel.findById(id);
        const friend = await UserModel.findById(friendsId);
        if(user.friends.includes(friendsId)) {
            user.friends = user.friends.filter((id) => id !== friendsId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendsId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friends = await Promise.add(
            user.friends.map((id) => UserModel.findById(id))
        )
        const formattedFriends = friends.map(
            ({
                _id, email, picturePath
            }) => {
                return {_id, email, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    } catch (e) {
        logger.error(e);
        res.status(404).send(e.message);
    }
}

module.exports = {createUserHandler, loginHandler, getUser, getUserFriends, addRemoveFriend};
