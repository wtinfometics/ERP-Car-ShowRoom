const express=require("express");
const bodyparser=require("body-parser");
const Sale=express();

const AuthMiddleware=require("../Middleware/AuthMiddleware")
const SalesController=require("../Controllers/SalesController");

Sale.use(bodyparser.json());
Sale.use(bodyparser.urlencoded({extended:true}));

Sale.post("/addsales",AuthMiddleware("admin","sales-ref","manager"),SalesController.addsale);
Sale.get("/viewsales",AuthMiddleware("admin","sales-ref","manager"),SalesController.viesales);
Sale.get("/viewsale/:id",AuthMiddleware("admin","sales-ref","manager"),SalesController.viewsale);
Sale.post("/updatesale/:id",AuthMiddleware("admin","sales-ref","manager"),SalesController.updatesale);
Sale.delete("/deletesale/:id",AuthMiddleware("admin","manager"),SalesController.deletesale);
Sale.get("/salespermonth",AuthMiddleware("admin","sales-ref","manager"),SalesController.viesales);

module.exports=Sale;