import userModel from '../models/user.model.js';


export const createUser=async({name,username,email,password})=>{
    if(!email || !password ||!username){
                throw new Error('Email,username and password are required');

    }
 // Check if email already exists
  const emailExists = await userModel.findOne({ email });
  if (emailExists) {
    throw new Error('A user with this email already exists');
  }

  // Check if username already exists
  const usernameExists = await userModel.findOne({ username });
  if (usernameExists) {
    throw new Error('Username is already taken');
  }
    const user=await userModel.create({
        email,
        name,
        username,
        password
    })
    return user
}