import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dqdzhdspe/image/upload/v1727085587/kyghhwvp3hpfjhnlk3l3.png"
    },
    category: {
        type: String,
        default: "Unauthorised"
    },
    slug:{
        type: String,
        required: true,
        unique: true
    }
},{ timestamps : true });

const Post = mongoose.model('postSchema',postSchema);
export default Post;