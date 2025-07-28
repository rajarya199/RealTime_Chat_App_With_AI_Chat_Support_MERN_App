import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 characters long"],
    maxLength: [50, "Email must not be longer than 50 characters"],
          match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],

  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select:false
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function(next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Generate JWT token method
userSchema.methods.generateJWT = function() {
  return jwt.sign(
        { id: this._id, email: this.email, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
// check,cpmpare password
userSchema.methods.isValidPassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model("user", userSchema);
export default User;
