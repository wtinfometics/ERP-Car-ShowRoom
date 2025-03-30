const { Validator } = require("node-input-validator");
const salesModel=require("../Models/SalesMode");
const SalesModel = require("../Models/SalesMode");
// Add New Sales Order Info
async function StoreOrder(req,res) {
    const validate=new Validator(req,bodyParser,{
        VehicleID:"required|string",
        CustomerName:"required|string",
        ModileNumber:"required|numeric|digits:10",
        Address:"required|string",
        City:"required|string",
        Pincode:"required|numeric|digits:6",
        Subtotal:"required|string",
        Tax:"required|string",
    });
    const matched=await validate.check();
    if (matched) {
        res.send(validate.errors).status(422);
    } else {
        const Total=req.body.Subtotal+req.body.Tax;
        const formdata={
            VehicleID:req.body.VehicleID,
            CustomerName:req.body.CustomerName,
            ModileNumber:req.body.ModileNumber,
            Address:req.body.Address,
            City:req.body.City,
            Pincode:req.body.Pincode,
            Subtotal:req.body.Subtotal,
            Tax:req.body.Tax,
            Total:Total
        }
        const AddSales= new SalesModel(formdata);
        const SaveOrder=await AddSales.save();
        if (SaveOrder) {
            res.send({message:"New Order Placed Successfully"}).status(200);
        } else {
            res.send({message:" Order Not Placed"}).status(400);
        }
    }
}

// View Salers Order Info
async function ViewOrders(req,res) {
    const Orders=await SalesModel.find();
    if (Orders.length>0) {
        res.send(Orders).status(200);
    } else {
        res.send({message:"Orders Table is Empty"}).status(400);
    }
}

// View Order Info
async function ViewOrder(req,res) {
    const id=req.params.id;
    const Order=await SalesModel.findById(id);
    if (Order) {
        res.send(Order).status(200);
    } else {
        res.send({message:"Order Not Exists"}).status(404);
    }
}

// delete Order Data
async function DeleteOrder(req,res) {
    const id=req.params.id;
    const Order=await SalesModel.findByIdAndDelete(id);
    if (Order) {
        res.send({message:"Order  Deleted"}).status(200);
    } else {
        res.send({message:"Order Not Deleted"}).status(404);
    }
}

// Vie Order Detais of this Month 
async function ViewOrderForThisMonth(req,res) {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    const orders = await SalesModel.find({
        createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth
        }
    });
    if (orders) {
        res.send(orders).status(200);
    } else {
        res.send({message:"Order Not Exists"}).status(404);
    }
}

module.exports={
    StoreOrder,
    ViewOrders,
    ViewOrder,
    DeleteOrder,
    ViewOrderForThisMonth,
}