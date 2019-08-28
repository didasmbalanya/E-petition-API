import { Router } from 'express';
import PetitionController from '../controllers/PetitionController';
import voteController from '../controllers/voteController';
// eslint-disable-next-line import/no-named-as-default
import auth from '../middlewares/user/auth';
import Validation from '../validation/validation';


const router = new Router();
const { petitionValidator } = Validation;
const {
  addPetition, deletePetition, viewSpecificPetition, specificTitlesPetitions, viewPetitions,
} = PetitionController;
const { upVote, downVote } = voteController;
router.delete('/:id', auth, deletePetition);
router.get('/:id', viewSpecificPetition);
router.post('/', auth, petitionValidator, addPetition);
router.get('/', viewPetitions);
router.get('/', specificTitlesPetitions);
router.patch('/:id/votes/upvote', auth, upVote);
router.patch('/:id/votes/downvote', auth, downVote);


export default router;
