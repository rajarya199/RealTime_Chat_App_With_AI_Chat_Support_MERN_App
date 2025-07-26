import Project from "../models/project.model.js";

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