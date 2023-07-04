import { Router } from 'express';
import { getBooking, addBooking, updataBooking, deleteBooking } from '../controller/booking.js';

//middleware
import { authenticate } from '../middleware/authenticate.js';

//initialize router
const router = Router();

router.get('/getBooking', authenticate, getBooking);
router.post('/addBooking', authenticate, addBooking);
router.put('/updataBooking', authenticate, updataBooking);
router.post('/deleteBooking', authenticate, deleteBooking);

export default router;