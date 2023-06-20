const express = require('express');
const config = require('config');
const log = require('./utils/logger');
const cors = require('cors');
const { connect } = require('./utils/connect');
const multer = require('multer');
const helmet = require('helmet');
const { auth } = require('./middleware/authentication');
const path = require('path');
const app = express();
const {createUserHandler, loginHandler, getUser, getUserFriends, addRemoveFriend} = require('./controllers/userController');
const {createPost, getFeedPosts, getUserPosts, likePost} = require('./controllers/postController');
const validateResource = require('./middleware/validateResource');
const createUserSchema = require('./schemas/userSchema');
const UserModel = require('./models/userModel');

const port = config.get("port");

const __fileName = path.resolve(module.filename);
const __dirName = path.dirname(__fileName);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirName, 'public/assets'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    } 
})

const upload = multer({
    storage
})
app.use('/assets', express.static('public/assets'));
app.post('/posts', auth, upload.single("picture"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
}))
app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/hello', (req, res) => {
    res.json({
        message: 'hello world'
    });
})
router.post('/signin', validateResource(createUserSchema), createUserHandler);
router.post('/login', validateResource(createUserSchema), loginHandler);
router.get('/me', auth, async (req, res) => {
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
router.get('/posts', auth, getFeedPosts);
router.get('/posts/:userId/posts', auth, getUserPosts);
router.patch('/posts/:id/like', auth, likePost);
router.get('/users/:id', auth, getUser);
router.get('/users/:id/friends', auth, getUserFriends);
router.patch('/users/:id/:friendId', auth, addRemoveFriend);

app.use(router)

app.listen(port, async () => {
    await connect();
    log.info(`app is listening on port ${port}`);
})
