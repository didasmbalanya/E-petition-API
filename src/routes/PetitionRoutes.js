import { Router } from 'express';
import PetitionController from '../controllers/PetitionController';
// eslint-disable-next-line import/no-named-as-default
import auth from '../middlewares/user/auth';
import Validation from '../validation/validation';

const router = new Router();
const { petitionValidator } = Validation;
const { addPetition, deletePetition, viewSpecificPetition } = PetitionController;

router.delete('/:id', auth, deletePetition);
router.post('/', petitionValidator, addPetition);
router.get('/:id', viewSpecificPetition);
export default router;
