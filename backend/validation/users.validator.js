import { body } from "express-validator";

export const registerUserValidation = [
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    body('username')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
];

export const loginUserValidation = [
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];
