import express from 'express'
import verifyUser from '../utils/verifyUser';
import { getUser, updateUser, deleteUser, signOut } from "../controllers/user.controller";
const router = express.Router();

router.get('/:userId',getUser);
router.post('/sign-out',signOut);
router.put('/update/:userId',verifyUser,updateUser);
router.delete('/delete/:userId',verifyUser,deleteUser);

export default router;