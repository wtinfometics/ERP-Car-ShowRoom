const express=require("express");
const bodyparser=require("body-parser");
const Service=express();

const AuthMiddleware=require("../Middleware/AuthMiddleware")
const ServiceController=require("../Controllers/ServicesController");

Service.use(bodyparser.json());
Service.use(bodyparser.urlencoded({extended:true}));

Service.post("/addservice",AuthMiddleware("admin","sales-ref","manager"),ServiceController.AddService);
Service.get("/viewservices",AuthMiddleware("admin","sales-ref","manager"),ServiceController.ViewAllServices);
Service.get("/viewservice/:id",AuthMiddleware("admin","sales-ref","manager"),ServiceController.ViewService);
Service.post("/updateservice/:id",AuthMiddleware("admin","sales-ref","manager"),ServiceController.UpdateService);
Service.delete("/deleteservice/:id",AuthMiddleware("admin","manager"),ServiceController.DeleteService);
Service.get("/servicespermonth",AuthMiddleware("admin","sales-ref","manager"),ServiceController.servicespermonth);

module.exports=Service;