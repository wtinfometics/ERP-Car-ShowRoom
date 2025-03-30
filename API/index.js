const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");

const AdminRoute=require("./Routes/AdminRoute");
const EmployeeRoute=require("./Routes/EmployeeRoute");
const CustomerRoute=require("./Routes/CustomerRoute");
const InventoryRoute=require("./Routes/InventoryRoute");
const JobCardRoute=require("./Routes/JobCardRoute");
const ServiceRoute=require("./Routes/ServiceRoute");
const QuotationRoute=require("./Routes/QuotationRoute");
const VehicleRoute=require("./Routes/VehicleRoute");
const SaleRoute=require("./Routes/SalesRoute")
app.use(cors({
    origin:"*"
}));

mongoose.connect("mongodb://localhost:27017/ERP");

app.use("/api",AdminRoute);
app.use("/api",EmployeeRoute);
app.use("/api",CustomerRoute);
app.use("/api",InventoryRoute);
app.use("/api",JobCardRoute);
app.use("/api",ServiceRoute);
app.use("/api",QuotationRoute);
app.use("/api",VehicleRoute);
app.use("/api",SaleRoute);

app.listen(8000,function (){
    console.log("Server is Running")
})
