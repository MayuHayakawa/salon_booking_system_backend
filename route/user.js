import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controller/user.js';

//middleware
import { authenticate } from '../middleware/authenticate.js';

//initialize router
const router = Router();

router.get('/getUserProfile', authenticate, getUserProfile);
router.put('/updateUserProfile', authenticate, updateUserProfile);

export default router;