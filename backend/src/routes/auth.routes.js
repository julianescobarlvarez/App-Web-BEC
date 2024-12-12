import { Router } from 'express'
import { login, register, logout, profile, updateUser, updateUserRole, deleteUser, verifyToken } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

import upload from '../middlewares/upload.middleware.js';

const router = Router()

router.post('/registro', validateSchema(registerSchema), upload.single('foto'), register);//Ruta para registar un usuario
router.post('/login', validateSchema(loginSchema), login);//Ruta para iniciar sesión
router.post('/logout', logout);//Ruta para cerrar sesión
router.get('/perfil', authRequired, profile);//Ruta para consultar los datos del perfil
router.patch('/perfil', authRequired, updateUser);//Ruta para modificar los datos del perfil
router.patch('/update-role', authRequired, isAdmin, updateUserRole);//Ruta para modificar el rol de otro usuario (sólo admin)
router.delete('/delete-user/:id', authRequired, isAdmin, deleteUser);//Ruta para eliminar un usuario (sólo admin)

router.get('/verify', verifyToken)

export default router;