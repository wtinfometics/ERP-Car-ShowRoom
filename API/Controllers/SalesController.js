const SalesModel = require("../Models/SalesMode");
const { Validator } = require("node-input-validator");
const moment = require('moment');
async function addsale(req, res) {
    const validate = new Validator(req.body, {
        VehicleID: "required|string",
        CustomerName: "required|string",
        ModileNumber: "required|string",
        EmployeeID:"required|string",
        Address: "required|string",
        Street: "required|string",
        City: "required|string",
        State: "required|string",
        Pincode: "required|numeric|digits:6",
        Subtotal: "required|numeric",
        RtoCharge: "required|numeric",
        Insurance: "required|numeric",
        Tax: "required|numeric",
        Total: "required|numeric",
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const formdata = {
            VehicleID: req.body.VehicleID,
            CustomerName: req.body.CustomerName,
            ModileNumber: req.body.ModileNumber,
            EmployeeID:req.body.EmployeeID,
            Address: req.body.Address,
            Street: req.body.Street,
            City: req.body.City,
            State: req.body.State,
            Pincode: req.body.Pincode,
            Subtotal: req.body.Subtotal,
            RtoCharge: req.body.RtoCharge,
            Insurance: req.body.Insurance,
            Tax: req.body.Tax,
            Total: req.body.Total,
        }
        const AddSale = new SalesModel(formdata);
        const SaveSale = await AddSale.save();
        if (SaveSale) {
            res.status(200).send({ message: "New Order placed Successfully" });
        } else {
            res.status(400).send({ message: " Order Not placed " });
        }
    }
}

async function viesales(req, res) {
    const Sales = await SalesModel.find().populate('VehicleID').populate('EmployeeID').exec();
    if (Sales.length > 0) {
        res.status(200).send(Sales);
    } else {
        res.status(400).send({ message: "Sale Data is Empty" });
    }
}

async function viewsale(req, res) {
    const id = req.params.id;
    const Sale = await SalesModel.findById(id).populate('VehicleID').populate('EmployeeID').exec();
    if (Sale) {
        res.status(200).send(Sale);
    } else {
        res.status(404).send({ message: "Sale Data not exists" });
    }
}

async function updatesale(req, res) {
    const validate = new Validator(req.body, {
        VehicleID: "required|string",
        CustomerName: "required|string",
        ModileNumber: "required|string",
        EmployeeID:"required|string",
        Address: "required|string",
        Street: "required|string",
        City: "required|string",
        State: "required|string",
        Pincode: "required|numeric|digits:6",
        Subtotal: "required|numeric",
        RtoCharge: "required|numeric",
        Insurance: "required|numeric",
        Tax: "required|numeric",
        Total: "required|numeric",
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const id = req.params.id;
        const formdata = {
            VehicleID: req.body.VehicleID,
            CustomerName: req.body.CustomerName,
            ModileNumber: req.body.ModileNumber,
            EmployeeID:req.body.EmployeeID,
            Address: req.body.Address,
            Street: req.body.Street,
            City: req.body.City,
            State: req.body.State,
            Pincode: req.body.Pincode,
            Subtotal: req.body.Subtotal,
            RtoCharge: req.body.RtoCharge,
            Insurance: req.body.Insurance,
            Tax: req.body.Tax,
            Total: req.body.Total,
        }
        const UpdateSale = await SalesModel.findByIdAndUpdate(id, formdata);
        if (UpdateSale) {
            res.status(200).send({ message: "Sale Data Updated" });
        } else {
            res.status(404).send({ message: "Sale Data not Updated" });
        }
    }
}

async function deletesale(req, res) {
    const id = req.params.id;
    const Sale = await SalesModel.findByIdAndDelete(id);
    if (Sale) {
        res.status(200).send({ message: "Sale Data deleted" });
    } else {
        res.status(404).send({ message: "Sale Data not deleted" });
    }
}

async function salespermonth(req,res) {
       const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();
    
        const customers = await SalesModel.find({
            CreatedAt: { $gte: startOfMonth, $lte: endOfMonth }
        });
        if (customers.length > 0) {
            res.status(200).send(customers );
        } else {
            res.status(400).send({ message: "Customer Data is Empty" })
        }
} 

async function GetOrdersOfEmployee(req,res) {
    const id=req.user.id;
    const Sales = await SalesModel.find({EmployeeID:id}).populate('VehicleID').populate('EmployeeID').exec();;
    if (Sales.length > 0) {
        res.status(200).send(Sales);
    } else {
        res.status(400).send({ message: "Sale Data is Empty" });
    }
}

async function GetOrdersOfEmployeeinthismonth(req,res) {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();
    const id=req.user.id;
    const customers = await SalesModel.find({EmployeeID:id,
        CreatedAt: { $gte: startOfMonth, $lte: endOfMonth }
    }).populate('VehicleID').exec();
    if (customers.length > 0) {
        res.status(200).send(customers );
    } else {
        res.status(400).send({ message: "Customer Data is Empty" })
    }
}
module.exports = {
    addsale,
    viesales,
    viewsale,
    updatesale,
    deletesale,
    salespermonth,
    GetOrdersOfEmployee,
    GetOrdersOfEmployeeinthismonth
}