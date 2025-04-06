const express=require("express");
const bodyparser=require("body-parser");
const Employee=express();

const AuthMiddleware=require("../Middleware/AuthMiddleware")
const EmployeeController=require("../Controllers/EmployeeController");

Employee.use(bodyparser.json());
Employee.use(bodyparser.urlencoded({extended:true}))

Employee.post("/addEmployee",AuthMiddleware("admin"),EmployeeController.CreateEmployee);
Employee.get("/ViewEmployees",AuthMiddleware("admin","manager"),EmployeeController.ViewEmployees);
Employee.get("/ViewEmployee/:id",AuthMiddleware("admin","manager"),EmployeeController.ViewEmployee);
Employee.post("/UpdateEmployee/:id",AuthMiddleware("admin"),EmployeeController.UpdateEmployee);
Employee.delete("/DeleteEmployee/:id",AuthMiddleware("admin"),EmployeeController.DeleteEmployee);
Employee.get("/getallsalesref",AuthMiddleware("admin","manager"),EmployeeController.getallsalesref);
Employee.get("/getEmployeebytoken",AuthMiddleware("sales-ref","manager"),EmployeeController.getEmployeeBytoken);

Employee.post("/employee/Login",EmployeeController.Login);
Employee.post("/employee/ForgetPassword",EmployeeController.ForgetPassword);
Employee.post("/employee/Verifyotp",EmployeeController.VerifyOtp);
Employee.post("/employee/ResetPassword",EmployeeController.ResetPassword);

module.exports=Employee;
