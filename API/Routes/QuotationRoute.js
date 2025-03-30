const express=require("express");
const bodyparser=require("body-parser");
const Quotation=express();

const AuthMiddleware=require("../Middleware/AuthMiddleware")
const QuotationController=require("../Controllers/QuotationsController");

Quotation.use(bodyparser.json());
Quotation.use(bodyparser.urlencoded({extended:true}))

Quotation.post("/addquotation",AuthMiddleware("admin","sales-ref","manager"),QuotationController.AddQuotation);
Quotation.get("/viewquotation",AuthMiddleware("admin","sales-ref","manager"),QuotationController.ViewAllQuotations);
Quotation.get("/viewquotation/:id",AuthMiddleware("admin","sales-ref","manager"),QuotationController.ViewQuotation);
Quotation.post("/updatequotation/:id",AuthMiddleware("admin","sales-ref","manager"),QuotationController.UpdateQuotation);
Quotation.delete("/deletequotation/:id",AuthMiddleware("admin","manager"),QuotationController.DeleteQuotation);

module.exports=Quotation;