import {Router} from "express"
import { body } from "express-validator";
import { addUserToProject, buildProject, getAllProject, getProjectByIdController, updateFiletreeController } from "../controllers/project.controller.js";
import  * as authmiddleware from"../middleware/auth.middleware.js"
import { createProjectValidation,addUserToProjectValidation,updateFileTreeValidation } from "../validation/project.validators.js";
import {validate} from"../validation/validator.middleware.js"

const router=Router()

router.post('/create',authmiddleware.authUser,
    createProjectValidation,
    validate,
        buildProject
)

router.get('/all',authmiddleware.authUser,getAllProject)
router.put('/add-user', authmiddleware.authUser,
    addUserToProjectValidation,
    validate,
        addUserToProject
)
router.get('/get-project/:projectId',authmiddleware.authUser,getProjectByIdController)


router.put('/update-file-tree',
    authmiddleware.authUser,
  updateFileTreeValidation,
    validate,
    updateFiletreeController
)
export default router;