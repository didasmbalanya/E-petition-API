import { Router } from 'express';
import PetitionController from '../controllers/PetitionController';
import voteController from '../controllers/voteController';
// eslint-disable-next-line import/no-named-as-default
import auth from '../middlewares/user/auth';
import Validation from '../validation/validation';
import wrongMethod from '../middlewares/router/wrongMethod';


const router = new Router();
const { petitionValidator } = Validation;
const {
  addPetition, deletePetition, viewSpecificPetition, specificTitlesPetitions, viewPetitions,
} = PetitionController;
const { upVote, downVote } = voteController;

router.route('/:id')
  .get(viewSpecificPetition)
  .delete(auth, deletePetition)
  .all(wrongMethod);

router.route('/')
  .get(viewPetitions)
  .get(specificTitlesPetitions)
  .post(auth, petitionValidator, addPetition)
  .all(wrongMethod);

router.route('/:id/votes/upvote')
  .patch(auth, upVote)
  .all(wrongMethod);

router.route('/:id/votes/downvote')
  .patch(auth, downVote)
  .all(wrongMethod);

export default router;
