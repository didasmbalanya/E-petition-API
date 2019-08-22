import { Router } from 'express';
import PetitionController, { deletePetition } from '../controllers/PetitionController';
import auth from '../middlewares/user/auth';

const router = new Router();

router.post('/', PetitionController.addPetition);
router.delete('/:id', auth, deletePetition);

export default router;
