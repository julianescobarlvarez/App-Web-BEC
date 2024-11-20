import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import {
    getDocument,
    getDocuments,
    createDocument,
    UpdateDocument,
    DeleteDocument,
}  from "../controllers/document.controller.js";
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createDocumentSchema } from '../schemas/document.schema.js';

const router= Router();

router.get("/documents", authRequired, getDocuments);
router.get("/documents/:id", authRequired, getDocument);
router.post("/documents", authRequired, validateSchema(createDocumentSchema), createDocument);
router.delete("/documents/:id", authRequired, DeleteDocument);
router.put("/documents/:id", authRequired, UpdateDocument);
export default router;