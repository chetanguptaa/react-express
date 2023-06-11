const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');

const UserInput = {
    email: String,
    password: String
};

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function(next) {
    let user = this;
    if(!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
})

userSchema.methods.comparePassword = async (candidatePassword) => {
    const user = this;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;