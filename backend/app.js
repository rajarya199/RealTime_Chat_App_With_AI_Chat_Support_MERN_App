import express from "express"
import morgon from 'morgan'
import connectDb from "./db/db.js"

connectDb();

const app=express() 
app.use(morgon('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.send("hello guys")
})

export default app