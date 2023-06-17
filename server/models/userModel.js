const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        picturePath: {type: String,default: "",},
        friends: {type: Array,default: [],},
        viewedProfile: Number,
        impressions: Number,
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
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    const user = this;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;