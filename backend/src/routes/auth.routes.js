import {Router} from 'express'
import {login, register, logout, profile} from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js';
const router = Router()

router.post('/registro', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/perfil', authRequired, profile);

export default router;