import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import {
    getDocument,
    getDocuments,
    createDocument,
    UpdateDocument,
    DeleteDocument,
}  from "..controllers/document.controller.js";

const router= Router();

router.get("/document", authRequired, getDocuments);
router.get("/document/:id", authRequired, getDocument);
router.post("/document", authRequired, createDocument);
router.delete("/document", authRequired, DeleteDocument);
router.put("/document", authRequired, UpdateDocument);
export default router;