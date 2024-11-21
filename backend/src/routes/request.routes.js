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

const router = express.Router();


router.post("/prestamos", authRequired, crearPrestamo);
router.get("/prestamos", authRequired, obtenerPrestamos);
router.get("/prestamos/misPrestamos", authRequired, obtenerPrestamosUsuario);
router.patch("/prestamos/:identificador", authRequired, validateSchema(updateRequestSchema), actualizarEstadoPrestamo);

export default router;
