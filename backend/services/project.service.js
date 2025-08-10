import Project from "../models/project.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
export const createProject = async ({ userId, name }) => {
  try {
    if (!name) {
      throw new Error("Name is required");
    }
    if (!userId) {
      throw new Error("UserId is required");
    }

    const project = await Project.create({
      name,
      users: [userId],
    });

    return project;
  } catch (error) {
    console.error("Error creating project:", error.message);
    throw error; 
  }
};


export const getAllProjectById=async({userId})=>{
  try{
    if (!userId) {
      throw new Error('UserId is required');
    }

    const userAllProjects = await Project.find({
      users: userId
    });
return userAllProjects
  }
  catch(error){
      console.error('Error fetching projects by userId:', error.message);
    throw error;
  }
}

export const addUserstoProj=async({projectId,users,userId})=>{
  try{
    if(!projectId){
      throw new Error("project id is required")
    }
     if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }
    if(!users){
      throw new Error("users are required")
    }
      if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array")
    }
      if (!userId) {
        throw new Error("userId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
    }
       const project = await Project.findOne({
        _id: projectId,
        users: userId
    })

    console.log(project)

    if (!project) {
        throw new Error("User not belong to this project")
    }
        const updatedProject = await Project.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject
  }
  catch(error){
console.log("error adding user:",error)
  }
}

export const getProjectById=async({projectId})=>{
  try{
    if(!projectId){
              throw new Error("projectId is required")
      console.log("project id is required")
    }
    const project= await Project.findOne({
              _id: projectId
    }).populate('users')
        return project;

  }
  catch(error){
console.error("something went wrong while geting project:",error)
    throw error;

  }
}

export const updateFileTree = async ({ projectId, fileTree }) => {
  try {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error("Invalid projectId");
    }

    if (!fileTree) {
      throw new Error("fileTree is required");
    }

    const project = await Project.findOneAndUpdate(
      { _id: projectId },
      { fileTree },
      { new: true }
    );

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    throw error;
  }
};
