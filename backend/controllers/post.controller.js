import { errorHandler } from "../utils/error";
import Post from "../models/post.model";

const getPost = async (req,res,next) => {
    const postId = req.params.postId;
    try{
        const post = await Post.findById(postId);
        if(!post){
            next(errorHandler(400, "Post not available"));
        }
        res.status(200)
        .json({
            post: post
        });
    }
    catch(err){
        next(err);
    }
}

const createPost = async (req,res,next) => {
    const { title, content } = req.body;
    if(!title || !content || title==="" || content===""){
        next(errorHandler(400, "All required fields should be filled"));
    }
    const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    });
    try{
        await newPost.save();
        res
        .status(200)
        .json("Post created successfully");
    }
    catch(err){
        next(err);
    }
}

const deletePost = async (req,res,next) => {
    if(req.user.id!==req.params.userId){
        next(errorHandler(400, "You are not allowed to delete"));
    }
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if(!post){
        next(errorHandler(400, "Post not available"));
    }
    try{
        await Post.findByIdAndDelete(postId);
        res.status(200)
        .json("Post deleted successfully");
    }
    catch(err){
        next(err);
    }
}

const updatePost = async (req,res,next) => {
    if(req.user.id!==req.params.userId){
        next(errorHandler(400, "You are not allowed to delete"));
    }
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if(!post){
        next(errorHandler(400, "Post not available"));
    }
    try{
        await Post.findByIdAndUpdate(postId,{
            $set: {
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
                category: req.body.category
            }
        }, { new: true });
    }
    catch(err){
        next(err);
    }
}

module.exports = { getPost, updatePost, deletePost, createPost };
