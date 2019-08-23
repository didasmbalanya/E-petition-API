import { Router } from 'express';
import UserController from '../controllers/userController';
import Validation from '../validation/validation';

const router = new Router();
const { userValidator, signInValidator } = Validation;

const { signIn, signUp } = UserController;

router.post('/signUp', userValidator, signUp);
router.post('/signin', signInValidator, signIn);

export default router;
