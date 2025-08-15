import { body } from "express-validator";

export const createProjectValidation = [
    body('name')
        .isString()
        .withMessage('Name is required')
];

export const addUserToProjectValidation = [
    body('projectId')
        .isString()
        .withMessage('Project ID is required'),

    body('users')
        .isArray({ min: 1 })
        .withMessage('Users must be an array of strings')
        .bail()
        .custom((users) => users.every(user => typeof user === 'string'))
        .withMessage('Each user must be a string')
];

export const updateFileTreeValidation = [
    body('projectId')
        .isString()
        .withMessage('Project ID is required'),

    body('fileTree')
        .isObject()
        .withMessage('File tree is required')
];
