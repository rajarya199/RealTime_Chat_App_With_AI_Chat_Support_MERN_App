import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
//errors.array()-multiple errors ,[0]-index0 ist error at a time
            // return res.status(400).json({ error: errors.array()[0].msg });

// Returns all validation errors at once.
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};
