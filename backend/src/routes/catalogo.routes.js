import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import {
    getDocument,
    getDocumentByAuthor,
    getDocumentByCategory,
    getDocumentByName,
    getDocuments,
    createDocument,
    UpdateDocument,
    DeleteDocument,
} from "../controllers/document.controller.js";
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createDocumentSchema } from '../schemas/document.schema.js';

const router = Router();

router.get("/documents", authRequired, getDocuments);//Ruta para consultar todos los documentos
router.get("/documents/:id", authRequired, getDocument);//Ruta para consultar un documento
router.get("/documents/nombre/:nombre", authRequired, getDocumentByName);//Ruta para consultar un documento por nombre
router.get("/documents/autor/:autor", authRequired, getDocumentByAuthor);//Ruta para consultar un documento por autor
router.get("/documents/categoria/:categoria", authRequired, getDocumentByCategory);//Ruta para consultar un documento por categoria
router.post("/documents", authRequired, validateSchema(createDocumentSchema), createDocument);//Ruta para agregar un documento
router.delete("/documents/:id", authRequired, DeleteDocument);//Ruta para eliminar un documento
router.put("/documents/:id", authRequired, UpdateDocument);//Ruta para actualizar un documento (es necesario ingresar todos los campos)
export default router;