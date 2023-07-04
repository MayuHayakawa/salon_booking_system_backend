import { Router } from 'express';
import { userRegister, staffRegister, userLogin, staffLogin, refresh } from '../controller/auth.js';
// import { userRegister, staffRegister, userLogin, staffLogin, logout, refresh } from '../controller/auth.js';

//initialize router
const router = Router();

router.post('/userRegister', userRegister);
router.post('/staffRegister', staffRegister);
router.post('/userLogin', userLogin);
router.post('/staffLogin', staffLogin);
// router.post('/logout', logout);
router.post('/refresh', refresh);

export default router;