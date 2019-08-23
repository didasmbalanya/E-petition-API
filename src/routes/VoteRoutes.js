import { Router } from 'express';
import voteController from '../controllers/voteController';
// eslint-disable-next-line import/no-named-as-default
import auth from '../middlewares/user/auth';
import Validation from '../validation/validation';

const router = new Router();
const { voteValidator } = Validation;
const { addVote } = voteController;
router.patch('/:id/vote', auth, voteValidator, addVote);
export default router;
