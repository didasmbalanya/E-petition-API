import { Router } from 'express';
import voteController from '../controllers/voteController';
// eslint-disable-next-line import/no-named-as-default
import auth from '../middlewares/user/auth';

const router = new Router();

router.route('/:id/vote')
  .patch(auth, voteController.addVote);
export default router;
