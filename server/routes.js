const express = require('express');
const {createUserHandler, loginHandler, getUser, getUserFriends, addRemoveFriend} = require('./controllers/userController');
const validateResource = require('./middleware/validateResource');
const createUserSchema = require('./schemas/userSchema');
const UserModel = require('./models/userModel');
const routes = express.Router();
const {auth} = require('./middleware/authentication');

routes.get('/hello', (req, res) => {
    res.json({
        message: 'hello world'
    });
})
routes.post('/signin', validateResource(createUserSchema), createUserHandler);
routes.post('/login', validateResource(createUserSchema), loginHandler);
routes.get('/me', auth, async (req, res) => {
    try {
        const user = await UserModel.findOne({ id: req.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ email: user.email, id: user.id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
routes.get('/', auth, getFeedPosts);
routes.get('/:userId/posts', auth, getUserPosts);
routes.patch('/:id/like', auth, likePost);
routes.get('/:id', auth, getUser);
routes.get('/:id/friends', auth, getUserFriends);
routes.patch('/:id/:friendId', auth, addRemoveFriend);


module.exports = routes;
