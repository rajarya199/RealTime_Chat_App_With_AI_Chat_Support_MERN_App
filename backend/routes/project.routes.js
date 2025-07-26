import {Router} from "express"
import { body } from "express-validator";
import { buildProject, getAllProject } from "../controllers/project.controller.js";
import  * as authmiddleware from"../middleware/auth.middleware.js"
const router=Router()

router.post('/create',authmiddleware.authUser,
        body('name').isString().withMessage('Name is required'),
        buildProject
)

router.get('/all',authmiddleware.authUser,getAllProject)
export default router;