import {Router} from 'express'
import {login, register, logout} from '../controllers/auth.controller.js'
const router = Router()

router.post('/registro', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;