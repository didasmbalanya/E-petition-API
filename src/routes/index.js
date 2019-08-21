import { Router } from 'express';
import UserRoutes from './UserRoutes';
import PetitionRoutes from './PetitionRoutes';
import VoteRoutes from './VoteRoutes';
import FlagRoutes from './FlagRoutes';


const router = new Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'welcome to petitioner API' });
});

router.use('users', UserRoutes);
router.use('petitions', PetitionRoutes);
router.use('votes', VoteRoutes);
router.use('flags', FlagRoutes);

export default router;
