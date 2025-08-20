import { Router } from 'express';
import  * as authmiddleware from"../middleware/auth.middleware.js"
import { saveMessage,getMessagesByProject } from '../controllers/message.controller.js';
const router=Router()
router.post("/save", authmiddleware.authUser, saveMessage);
router.get("/project/:projectId",authmiddleware.authUser,getMessagesByProject)
export default router;