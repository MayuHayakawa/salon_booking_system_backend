import { Router } from 'express';
import { getSchedule, addSchedule, updataSchedule, deleteSchedule } from '../controller/staffschedule.js';
// import { getSchedule, addSchedule, updataSchedule, deleteSchedule } from '../controller/staffSchedule.js'

//middleware
// import { authenticate } from '../middleware/authenticate.js';

//initialize router
const router = Router();

router.get('/getSchedule', getSchedule);
router.post('/addSchedule', addSchedule);
router.put('/updataSchedule', updataSchedule);
router.delete('/deleteSchedule', deleteSchedule);

export default router;