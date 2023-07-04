import { Router } from 'express';
import { getMenu, addMenu, updateMenu, deleteMenu } from '../controller/menu.js';

//initialize router
const router = Router();

router.get('/getMenu', getMenu);
router.post('/addMenu', addMenu);
router.put('/updateMenu', updateMenu);
router.post('/deleteMenu', deleteMenu);

export default router;