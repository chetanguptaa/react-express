const  UserModel  = require('../models/userModel');

const createUser = async (input) => {
    try {
        const user = await UserModel.create(input);
        const { password, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    } catch (e) {
        throw new Error(e);
    }
}

const findUser = async (query) => {
    return UserModel.findOne(query).lean();
}

module.exports = {
    createUser, findUser
}