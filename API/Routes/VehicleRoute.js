const express=require("express");
const bodyparser=require("body-parser");
const Vehicle=express();
const AuthMiddleware=require("../Middleware/AuthMiddleware")
const VehicleController=require("../Controllers/VehicleController");

Vehicle.use(bodyparser.json());
Vehicle.use(bodyparser.urlencoded({extended:true}));



Vehicle.post("/addvehicle",AuthMiddleware("admin","sales-ref","manager"),VehicleController.AddVehicle);
Vehicle.get("/viewvehicles",AuthMiddleware("admin","sales-ref","manager"),VehicleController.ViewAllVehicles);
Vehicle.get("/viewvehicle/:id",AuthMiddleware("admin","sales-ref","manager"),VehicleController.ViewVehicle);
Vehicle.post("/updatevehicle/:id",AuthMiddleware("admin","sales-ref","manager"),VehicleController.UpdateVehicle);
Vehicle.delete("/deletevehicle/:id",AuthMiddleware("admin","manager"),VehicleController.DeleteVehicle);
Vehicle.get("/calculatevehicleprice/:id",AuthMiddleware("admin","sales-ref","manager"),VehicleController.CalculateVehicleAmount);

module.exports=Vehicle;