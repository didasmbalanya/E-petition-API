import { Router } from 'express';
import UserController from '../controllers/userController';
import Validation from '../validation/validation';
import wrongMethod from '../middlewares/router/wrongMethod';

const router = new Router();
const { userValidator, signInValidator } = Validation;

const { signIn, signUp } = UserController;

router.route('/auth/signup').post(userValidator, signUp).all(wrongMethod);
router.route('/auth/signin').post(signInValidator, signIn).all(wrongMethod);

export default router;
