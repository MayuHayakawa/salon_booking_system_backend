import { Router } from 'express';
import { getAllStaff, getStaffProfile, updateStaffProfile, deleteStaffProfile } from '../controller/staff.js';

//middleware
import { authenticate } from '../middleware/authenticate.js';

//initialize router
const router = Router();

router.get('/getAllStaff', getAllStaff);
router.get('/getStaffProfile', authenticate, getStaffProfile);
router.put('/updateStaffProfile', updateStaffProfile);
router.post('/deleteStaffProfile', deleteStaffProfile);

export default router;