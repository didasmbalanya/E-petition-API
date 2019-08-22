import { Router } from 'express';
import voteController from '../controllers/voteController';
const router = new Router();

router.route('/:id/vote')
.patch(voteController.addVote);
export default router;
