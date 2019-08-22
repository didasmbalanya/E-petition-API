import { Router } from 'express';
import UserController from '../controllers/userController';

const router = new Router();

const { signIn, signUp } = UserController;

router.post('/signUp', signUp);
router.post('/signin', signIn);

export default router;
