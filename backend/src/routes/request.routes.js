import express from "express";
import {
  crearPrestamo,
  obtenerPrestamos,
  actualizarEstadoPrestamo,
  obtenerPrestamosUsuario,
} from "../controllers/request.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { updateRequestSchema } from "../schemas/request.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();


router.post("/prestamos", authRequired, crearPrestamo);//Ruta para solicitar préstamo
router.get("/prestamos", authRequired, isAdmin, obtenerPrestamos);//Ruta para ver los préstamos (admin)
router.get("/prestamos/misPrestamos", authRequired, obtenerPrestamosUsuario);//Ruta para ver los préstamos (usuario)
router.patch("/prestamos/:identificador", authRequired, isAdmin, validateSchema(updateRequestSchema), actualizarEstadoPrestamo);//Ruta para actualizar préstamos (admin)

export default router;
