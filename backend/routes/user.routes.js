import {Router} from "express"
import { createUserController,loginController,ProfileController,logoutController, getAllUsersController } from "../controllers/user.controller.js"
import  * as authmiddleware from"../middleware/auth.middleware.js"
import { loginUserValidation,registerUserValidation } from "../validation/users.validator.js";
import {validate} from"../validation/validator.middleware.js"

const router=Router();
router.post("/register",
    registerUserValidation,
    validate,
    createUserController)


    router.post('/login',
loginUserValidation,
validate,
    loginController
    )


    router.get('/profile',authmiddleware.authUser,ProfileController)
    router.get('/logout',authmiddleware.authUser,logoutController)
    router.get('/all',authmiddleware.authUser,getAllUsersController)
export default router