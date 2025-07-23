import mongoose from "mongoose";

function connectDb(){
      const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("Error: MONGO_URI is not defined in environment variables.");
    // process.exit(1); // Exit with failure to prevent further errors
  }
    mongoose.connect(mongoUri)
    .then(()=>{
        console.log("db connected")
    })
    .catch(err=>{
        console.log("error during db connection:",err)
    })
}

export default connectDb