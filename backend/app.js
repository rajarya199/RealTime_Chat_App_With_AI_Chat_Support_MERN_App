import express from "express"
import morgan from 'morgan'
import connectDb from "./db/db.js"
import userRoutes from './routes/user.routes.js';
import cookieParser from "cookie-parser";
import cors from "cors"
connectDb();

const app=express() 
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

app.use('/users', userRoutes);


app.get('/',(req,res)=>{
    res.send("hello guys")
})

export default app