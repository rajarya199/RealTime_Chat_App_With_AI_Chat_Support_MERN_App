import {Router} from "express"
import { createUserController,loginController,ProfileController } from "../controllers/user.controller.js"
import { body } from "express-validator";
import  * as authmiddleware from"../middleware/auth.middleware.js"
const router=Router();
router.post("/register",
     body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
body('username').isLength({min:3}).withMessage("username must be of at least 3 character")
    ,createUserController)


    router.post('/login',
            body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    loginController
    )


    router.get('/profile',authmiddleware.authUser,ProfileController)
export default router