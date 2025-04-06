const express=require("express");
const bodyparser=require("body-parser");
const Admin=express();

const AuthMiddleware=require("../Middleware/AuthMiddleware")
const AdminController=require("../Controllers/AdminController");

Admin.use(bodyparser.json());
Admin.use(bodyparser.urlencoded({extended:true}))

Admin.post("/addadmin",AdminController.CreateAdmin);
Admin.get("/ViewAdmins",AuthMiddleware("admin","sales-ref","manager"),AdminController.ViewAdmins);
Admin.get("/ViewAdmin/:id",AuthMiddleware("admin"),AdminController.ViewAdmin);
Admin.post("/UpdateAdmin/:id",AuthMiddleware("admin"),AdminController.UpdateAdmin);
Admin.delete("/DeleteAdmin/:id",AuthMiddleware("admin"),AdminController.DeleteAdmin);
Admin.get("/getadminbytoken",AuthMiddleware("admin"),AdminController.getadminBytoken);

Admin.post("/admin/Login",AdminController.Login);
Admin.post("/admin/ForgetPassword",AdminController.ForgetPassword);
Admin.post("/admin/Verifyotp",AdminController.VerifyOtp);
Admin.post("/admin/ResetPassword",AdminController.ResetPassword);



module.exports=Admin;