import { createProject,getAllProjectById } from "../services/project.service.js";
import User from "../models/user.model.js";
import { validationResult } from 'express-validator';


export const buildProject=async(req,res)=>{
       const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
          const { name } = req.body;
        // const loggedInUser = await User.findOne({ email: req.user.email });
        const userId = req.user.id  // as pass in jwt token-id,email,username

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

export const getAllProject=async(req,res)=>{
    try{
const userId=req.user.id

const userAllProjects=await getAllProjectById({userId})
  return res.status(200).json({
            projects: userAllProjects
        })
    }catch(err){
        console.log("error in getting projs:",err)
                res.status(400).json({ error: err.message })

    }
}