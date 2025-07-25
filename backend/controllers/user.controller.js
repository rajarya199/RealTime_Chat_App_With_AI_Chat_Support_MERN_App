import UserModel from "../models/user.model.js";
import { createUser } from "../services/user.services.js";
import {validationResult} from "express-validator"
export const createUserController=async(req,res)=>{
     // Check for validation errors from express-validator middleware
   const errors=validationResult(req)
   if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()})
   }
    try{
const user=await createUser(req.body);
        const token = await user.generateJWT();
        res.status(201).json({ user, token });

    }
    catch(error){
        res.status(400).send(error.message);

    }
}

export const loginController=async(req,res)=>{
    const errors=validationResult(req);
      if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()})
   }
     const { email, password } = req.body;

   try{
     const user=await UserModel.findOne({email}).select('+password');
   if(!user){
    res.status(401).json({
        errors:'user not found'
    })
   }
   const isMatch=await user.isValidPassword(password)
   if(!isMatch){
    return res.status(401).json({
        errors:"invalid credientials"
    })
   }

       // Generate JWT token
   const token=await user.generateJWT()

return res.status(200).json({
  message: 'Login successful',
  user,
  token
});
  
   }
   catch(error){
    console.log("error during login",error)
   }
  
}

export const ProfileController=async(req,res)=>{
    console.log(req.user)
      res.status(200).json({
        user: req.user
    });
}