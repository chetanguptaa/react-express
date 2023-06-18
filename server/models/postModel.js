const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes : {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true
    }
);

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;