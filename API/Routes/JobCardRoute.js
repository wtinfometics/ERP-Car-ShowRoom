const express=require("express");
const bodyparser=require("body-parser");
const JobCard=express();

const AuthMiddleware=require("../Middleware/AuthMiddleware")
const JobCardController=require("../Controllers/JobCardController");

JobCard.use(bodyparser.json());
JobCard.use(bodyparser.urlencoded({extended:true}))

JobCard.post("/addjobcard",AuthMiddleware("admin","sales-ref","manager"),JobCardController.AddJobCard);
JobCard.get("/viewjobcards",AuthMiddleware("admin","sales-ref","manager"),JobCardController.ViewAllJobCards);
JobCard.get("/viewjobcard/:id",AuthMiddleware("admin","sales-ref","manager"),JobCardController.ViewJobCard);
JobCard.post("/updatejobcard/:id",AuthMiddleware("admin","sales-ref","manager"),JobCardController.UpdateJobCard);
JobCard.delete("/deletejobcard/:id",AuthMiddleware("admin","manager"),JobCardController.DeleteJobCard);

module.exports=JobCard;