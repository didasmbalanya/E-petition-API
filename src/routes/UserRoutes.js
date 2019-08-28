/* eslint-disable import/no-named-as-default */
import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/userController';
import Validation from '../validation/validation';
import wrongMethod from '../middlewares/router/wrongMethod';
import auth from '../middlewares/user/auth';

const router = new Router();
const { userValidator, signInValidator } = Validation;

const {
  signIn, fbSignIn, signUp, changeAdmin,
} = UserController;

router.route('/auth/signup').post(userValidator, signUp).all(wrongMethod);
router.route('/auth/signin').post(signInValidator, signIn).all(wrongMethod);
router.route('/admin/:id').patch(auth, changeAdmin).all(wrongMethod);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/fb/callback', passport.authenticate('facebook', { failureRedirect: '/api/v1/auth/facebook' }), fbSignIn);

export default router;
