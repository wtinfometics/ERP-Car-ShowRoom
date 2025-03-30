const express=require("express");
const bodyparser=require("body-parser");
const OrderController=require("../Controllers/OrderController");

const Order=express();

Order.use(bodyparser.json());
Order.use(bodyparser.urlencoded({extended:true}));

Order.get("/placeorder",OrderController.StoreOrder);
Order.get("/vieworders",OrderController.ViewOrders);
Order.get("/vieworder",OrderController.ViewOrder);
Order.delete("/deleteorder",OrderController.DeleteOrder);
Order.get("/thismonthorder",OrderController.ViewOrderForThisMonth);

module.exports=Order;