import {Router} from "express"
import { body } from "express-validator";
import { addUserToProject, buildProject, getAllProject } from "../controllers/project.controller.js";
import  * as authmiddleware from"../middleware/auth.middleware.js"
const router=Router()

router.post('/create',authmiddleware.authUser,
        body('name').isString().withMessage('Name is required'),
        buildProject
)

router.get('/all',authmiddleware.authUser,getAllProject)
router.put('/add-user', authmiddleware.authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
        addUserToProject
)
export default router;