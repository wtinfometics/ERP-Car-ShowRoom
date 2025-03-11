const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");

app.use(cors({
    origin:"*"
}));

mongoose.connect("mongodb://localhost:27017/SimpleBlog");

app.listen(8000,function (){
    console.log("Server is Running")
})
