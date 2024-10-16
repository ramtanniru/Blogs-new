import User from '../models/user.model';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error';

const signIn = async (req,res,next) => {
    const { email, password } = req.body;
    if (!email || !password || email==="" || password===""){
        next(errorHandler(400, "Empty fields are not accepted" ));
    }

    try {
        const user = await User.findOne({email});
        if(!user){
            next(errorHandler(400, "User doesn't exist!"));
        }
        const validPassword = bcryptjs.compare(password, user.password);
        if(!validPassword){
            next(errorHandler(400, "Invalid password"));
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
        )

        const { password:pass, ...rest } = user._doc;

        res
        .status(200)
        .cookie("auth_token",token,{
            httpOnly: true,
        })
        .json(rest);
    }
    catch(err){
        next(err);
    }
}

const signUp = async (req,res,next) => {
    const { email, username, password } = req.body;
    if ( !email || !username || !password || 
        username==="" || password==="" || email===""
    ){
        next(errorHandler(400, 'All are required fields'));
    }
    try{
        const userExists = await User.findOne({email});
        if(userExists){
            next(errorHandler(400, "User already exists"));
        }
        const hashedPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        try{
            await newUser.save();
            res.json('Signup successful');
        }
        catch(err){
            next(err);
        }
    }
    catch(err){
        next(err);
    }
}

module.exports = { signIn, signUp };