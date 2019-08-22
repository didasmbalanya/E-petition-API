import { Router } from 'express';
import PetitionController from '../controllers/PetitionController';
import auth from '../middlewares/user/auth';

const router = new Router();

const { addPetition, deletePetition } = PetitionController;

router.post('/', addPetition);
router.delete('/:id', auth, deletePetition);
router.post('/', addPetition);

export default router;
