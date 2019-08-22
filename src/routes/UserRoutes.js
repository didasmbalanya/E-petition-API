import { Router } from 'express';
import userController from '../controllers/userController';

const router = new Router();

router.post('/signUp', userController.signUp);

export default router;
