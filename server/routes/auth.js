const express = require('express');
const {createUserHandler, loginHandler} = require('../controllers/userController');
const validateResource = require('../middleware/validateResource');
const createUserSchema = require('../schemas/userSchema');
const UserModel = require('../models/userModel');
const router = express.Router();
const {auth} = require('../middleware/authentication');

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

module.exports = router;
