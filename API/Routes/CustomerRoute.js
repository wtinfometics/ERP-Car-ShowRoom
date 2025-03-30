const express=require("express");
const bodyparser=require("body-parser");
const Customer=express();

const AuthMiddleware=require("../Middleware/AuthMiddleware")
const CustomerController=require("../Controllers/CustomerController");

Customer.use(bodyparser.json());
Customer.use(bodyparser.urlencoded({extended:true}));

Customer.post("/addcustomer",AuthMiddleware("admin","sales-ref","manager"),CustomerController.AddCustomer);
Customer.get("/viewcustomers",AuthMiddleware("admin","sales-ref","manager"),CustomerController.ViewAllCustomer);
Customer.get("/viewcustomer/:id",AuthMiddleware("admin","sales-ref","manager"),CustomerController.ViewCustomer);
Customer.post("/updatecustomer/:id",AuthMiddleware("admin","sales-ref","manager"),CustomerController.UpdateCustomer);
Customer.delete("/deletecustomer/:id",AuthMiddleware("admin","manager"),CustomerController.DeleteCustomer);
Customer.get("/customerpermonth",AuthMiddleware("admin","sales-ref","manager"),CustomerController.CustomerLeadsPerMonth);

module.exports=Customer;