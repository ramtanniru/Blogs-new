import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import cookie from 'cookie-parser';
import userRoutes from './routes/user.route';
import authRoutes from './routes/user.route';
import postRoutes from './routes/user.route';
import commentRoutes from './routes/user.route';

dotenv.config();

const app = express();
const server = http.createServer(app);

mongoose.set('strictQuery',true);
mongoose
    .connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log('DB connected');        
    })
    .catch((err)=>{
        console.log('Error occured while connecting to DB');
    });

app.use(express.json());
app.use(cors());
app.use(cookie());

app.use('/user',userRoutes);
app.use('/auth',authRoutes);
app.use('/post',postRoutes);
app.use('/comment',commentRoutes);

const port = process.env.PORT || '5000';
server.listen(port,()=>{
    console.log('server is running');
})