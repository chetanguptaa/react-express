const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
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

const PostModel = mongoose.Model('Post', postSchema);

export default PostModel;