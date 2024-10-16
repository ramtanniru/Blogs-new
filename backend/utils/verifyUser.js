import jwt from 'jsonwebtoken';
import { errorHandler } from './error';

export default verifyUser = (req,res,next) => {
    const token = req.cookies.auth_token;
    if(!token){
        return next(errorHandler(401, "Unauthorised user"));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(401,"Unauthorised user");
        }
        req.user = user;
        next();
    })
}