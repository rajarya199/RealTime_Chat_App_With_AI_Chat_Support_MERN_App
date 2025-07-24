import userModel from '../models/user.model.js';


export const createUser=async({name,username,email,password})=>{
    if(!email || !password ||!username){
                throw new Error('Email,username and password are required');

    }

    const user=await userModel.create({
        email,
        name,
        username,
        password
    })
    return user
}