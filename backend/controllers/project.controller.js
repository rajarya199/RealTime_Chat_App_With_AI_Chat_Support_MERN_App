import { createProject } from "../services/project.service.js";
import User from "../models/user.model.js";
import { validationResult } from 'express-validator';


export const buildProject=async(req,res)=>{
       const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
          const { name } = req.body;
        const loggedInUser = await User.findOne({ email: req.user.email });
        const userId = loggedInUser._id;

        const newProject= await createProject({name,userId})
    res.status(201).json({
         message: "Project created successfully",
          project: newProject });
    }
    catch(error){
 console.log(error);
        res.status(400).send(error.message);
    }
}