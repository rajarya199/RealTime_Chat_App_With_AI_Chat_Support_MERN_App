import { Router } from 'express';
import  * as authmiddleware from"../middleware/auth.middleware.js"
import { saveMessage,getMessagesByProject ,updateMessageFileTreeController} from '../controllers/message.controller.js';
import {validate} from"../validation/validator.middleware.js"
import { updateFileTreeValidation } from '../validation/message.validators.js';
const router=Router()
router.post("/save", authmiddleware.authUser, saveMessage);
router.get("/project/:projectId",authmiddleware.authUser,getMessagesByProject)
router.put("/update-file-tree",
    authmiddleware.authUser,
    updateFileTreeValidation,
    validate,
    updateMessageFileTreeController)
export default router;