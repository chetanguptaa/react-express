const express = require('express');
const {createUserHandler} = require('./controllers/userController');
const validateResource = require('./middleware/validateResource');
const createUserSchema = require('./schemas/userSchema');


const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({
        message: 'hello world'
    });
})
routes.post('/signin', validateResource(createUserSchema), createUserHandler);
routes.post('/login', validateResource(createUserSchema), createUserHandler);



module.exports = routes;
