import express from 'express'
import verifyUser from '../utils/verifyUser';

const router = express.Router();

router.get('/:postId',getPost);
router.post('/create',verifyUser,createPost);
router.put('/edit/:postId/:userId',verifyUser,updatePost);
router.delete('/delete/:postId/:userId',verifyUser,deletePost);

export default router;