const express = require('express');
const {createUserHandler, loginHandler} = require('./controllers/userController');
const validateResource = require('./middleware/validateResource');
const createUserSchema = require('./schemas/userSchema');
const UserModel = require('./models/userModel');
const routes = express.Router();
const {auth} = require('./middleware/authentication');

routes.get('/', (req, res) => {
    res.json({
        message: 'hello world'
    });
})
routes.post('/signin', validateResource(createUserSchema), createUserHandler);
routes.post('/login', validateResource(createUserSchema), loginHandler);
routes.get("/me", auth, (req, res) => {
    const user = UserModel.find((x) => x.id === req.userId);
    res.json({ email: user.email, id: user.id });
});


module.exports = routes;
