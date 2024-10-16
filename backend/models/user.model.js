import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    profilePicture : {
        type: String,
        default: "https://res.cloudinary.com/dqdzhdspe/image/upload/v1727085587/kyghhwvp3hpfjhnlk3l3.png"
    },
    isAdmin : {
        type: Boolean,
        default: false,
    },
},
{timestamps: true});

const User = mongoose.model('User',userSchema)
export default User;