import { body } from "express-validator";

export const updateFileTreeValidation=[
 body('messageId')
        .isString()
        .withMessage('Project ID is required'),
        
    body('fileTree')
        .isObject()
        .withMessage('File tree is required')
];
