import { Router } from 'express';
import PetitionController from '../controllers/PetitionController';

const router = new Router();

router.post('/', PetitionController.addPetition)

export default router;
