import express from 'express'
import verifyUser from '../utils/verifyUser';

const router = express.Router();

router.post('/sign-in',signIn);
router.post('/sign-up',signUp);
// router.post('/google',google);

export default router;