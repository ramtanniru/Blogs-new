import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error";

const getUser = async (req,res,next) => {
    const userId = req.params.userId;
    try{
        const user = await User.findById(userId);
        if(!user){
            next(errorHandler(400, "User doesn't exist!"));
        }
        const { password:pass, ...rest } = user._doc;
        res.status(200).json(rest);
    }
    catch(err){
        next(err);
    }
}

const signOut = (req,res,next) => {
    try{
        res.clearCookie('auth_token').status(200).json("User signed out successfully");
    }
    catch(err){
        next(err);
    }
}

const deleteUser = async (req,res,next) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user){
        next(errorHandler(400, "User doesn't exist to delete"));
    }
    if(req.user.id!==userId){
        next(errorHandler(400, "You are not allowed"));
    }
    try{
        await User.findByIdAndDelete(userId);
        res.status(200).json("User deleted successfully");
    }
    catch(err){
        next(err);
    }
}

const updateUser = async (req,res,next) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user){
        next(errorHandler(400, "User doesn't exist to delete"));
    }
    if(!req.user.id!==userId){
        next(errorHandler(400, "You are not allowed"));
    }
    try{
        await User.findByIdAndUpdate(userId,{
            $set : {
                username: req.body.username,
                password: req.body.password,
                profilePicture: req.body.profilePicture,
                email: req.body.email
            }
        },{ new: true });
    }
    catch(err){
        next(err);
    }
}


module.exports = { getUser, deleteUser, updateUser, signOut };