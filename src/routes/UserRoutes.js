/* eslint-disable import/no-named-as-default */
import { Router } from 'express';
import UserController from '../controllers/userController';
import Validation from '../validation/validation';
import wrongMethod from '../middlewares/router/wrongMethod';
import auth from '../middlewares/user/auth';

const router = new Router();
const { userValidator, signInValidator } = Validation;

const { signIn, signUp, changeAdmin } = UserController;

router.route('/auth/signup').post(userValidator, signUp).all(wrongMethod);
router.route('/auth/signin').post(signInValidator, signIn).all(wrongMethod);
router.route('/admin/:id').patch(auth, changeAdmin).all(wrongMethod);

export default router;
