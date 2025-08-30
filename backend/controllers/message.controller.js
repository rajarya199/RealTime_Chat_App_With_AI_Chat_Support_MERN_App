import Project from "../models/project.model.js";
import Message from "../models/message.model.js"
import mongoose from "mongoose";

export const saveMessage=async(req,res)=>{
    try{
        const{projectId,text,aiResponse,isAI}=req.body;
        //validate fields
           if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Message text is required" });
    }

    //2 validate if project exist
    const project=await Project.findById(projectId);
     if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    //3 set sender info-user/ai
    let sender;
    if(isAI){
          sender = {
        id: "ai",
        username: "AI",
        email: "AI",
      };
    }else{
         if (!req.user) {
        return res.status(401).json({ error: "Unauthorized user" });
      }
      sender={
         id: req.user.id,
        username: req.user.username,
        email: req.user.email,
      } 
    }

    //4 save new message
    const newMessage=await Message.create({
        project:projectId,
        sender,
         message: text,
        aiResponse:aiResponse || null,
    });

    res.status(201).json(newMessage);
    }
    catch(error){
  console.error("Error creating message:", error);
    res.status(500).json({ error: "Internal Server Error" });
    }

}


 
export const getMessagesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }
    const messages = await Message.find({ project: projectId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateMessageFileTreeController = async (req, res) => {
  try {
    const { messageId, fileTree } = req.body;

    if (!messageId) {
      throw new Error("messageId is required");
    }
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      throw new Error("Invalid messageId");
    }
    if (!fileTree) {
      throw new Error("fileTree is required");
    }

    const message = await Message.findOneAndUpdate(
      { _id: messageId },
      { $set: { "aiResponse.fileTree": fileTree } }, // ✅ only updates fileTree
      { new: true }
    );

    if (!message) {
      throw new Error("Message not found");
    }

    return res.status(200).json({ message });
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(400).json({ error: error.message });
  }
};