import UserModel from "../models/user.model.js";
import { createUser, getAllUsers } from "../services/user.services.js";
import redisClient from "../services/redis.services.js";
export const createUserController=async(req,res)=>{
 
    try{
const user=await createUser(req.body);
        const token = await user.generateJWT();
                delete user._doc.password;

        res.status(201).json({ user, token });

    }
    catch(error){
    res.status(400).json({ error: error.message });

    }
}

export const loginController=async(req,res)=>{

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
delete user._doc.password
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

export const logoutController=async(req,res)=>{
    try{
     const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
             redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
 res.status(200).json({
            message: 'Logged out successfully'
        });
    }
    catch(err){
  console.log(err);
        res.status(400).send(err.message);
    }
}

export const getAllUsersController = async (req, res) => {
    try {

        const loggedInUserId = req.user.id

        const allUsers = await getAllUsers({ userId: loggedInUserId });

        return res.status(200).json({
            users: allUsers
        })

    } catch (err) {

        console.log(err)

        res.status(400).json({ error: err.message })

    }
}