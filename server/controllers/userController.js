const logger = require('../utils/logger');
const createUser = require('../services/userService');

const createUserHandler = async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (e) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}