const CustomerModel = require("../Models/CustomerModel");
const { Validator } = require("node-input-validator");
const moment = require('moment');
async function AddCustomer(req, res) {
    const validate = new Validator(req.body, {
        Firstname: "required|string",
        lastname: "required|string",
        source: "required|string",
        MobileNum: "required|string",
        MinRange: "required|numeric",
        MaxRange: "required|numeric",
        Job: "required|string",
        Address: "required|string",
        Street: "required|string",
        City: "required|string",
        State: "required|string",
        Pincode: "required|numeric|digits:6",
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const formdata = {
            Firstname: req.body.Firstname,
            lastname: req.body.lastname,
            source: req.body.source,
            MobileNum: req.body.MobileNum,
            MinRange: req.body.MinRange,
            MaxRange: req.body.MaxRange,
            Job: req.body.Job,
            Address: req.body.Address,
            Street: req.body.Street,
            City: req.body.City,
            State: req.body.State,
            Pincode: req.body.Pincode,
        }
        const AddCustomer = new CustomerModel(formdata);
        const SaveCustomer = await AddCustomer.save();
        if (SaveCustomer) {
            res.status(200).send({ message: "Customer Data is Added" });
        } else {
            res.status(400).send({ message: "Customer Data Not Added" });
        }
    }
}

async function ViewAllCustomer(req, res) {
    const Customers = await CustomerModel.find();
    if (Customers.length > 0) {
        res.status(200).send(Customers);
    } else {
        res.status(400).send({ message: "Customer Data is Empty" })
    }
}

async function ViewCustomer(req, res) {
    const id = req.params.id;
    const Customer = await CustomerModel.findById(id);
    if (Customer) {
        res.status(200).send(Customer);
    } else {
        res.status(400).send({ message: "Customer Data Not Exists" });
    }
}

async function UpdateCustomer(req, res) {
    const validate = new Validator(req.body, {
        Firstname: "required|string",
        lastname: "required|string",
        source: "required|string",
        MinRange: "required|numeric",
        MaxRange: "required|numeric",
        Job: "required|string",
        MobileNum: "required|string",
        Address: "required|string",
        Street: "required|string",
        City: "required|string",
        State: "required|string",
        Pincode: "required|numeric|digits:6",
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const id = req.params.id;
        const formdata = {
            Firstname: req.body.Firstname,
            lastname: req.body.lastname,
            source: req.body.source,
            MobileNum: req.body.MobileNum,
            MinRange: req.body.MinRange,
            MaxRange: req.body.MaxRange,
            Job: req.body.Job,
            Address: req.body.Address,
            Street: req.body.Street,
            City: req.body.City,
            State: req.body.State,
            Pincode: req.body.Pincode,
        }
        const UpdateCustomer = await CustomerModel.findByIdAndUpdate(id, formdata);
        if (UpdateCustomer) {
            res.status(200).send({ message: "Customer Data is Updated" });
        } else {
            res.status(400).send({ message: "Customer Data Not Updated" });
        }
    }
}

async function DeleteCustomer(req, res) {
    const id = req.params.id;
    const DeleteCustomer = await CustomerModel.findByIdAndDelete(id);
    if (DeleteCustomer) {
        res.status(200).send({ message: "Customer Data is Deleted" });
    } else {
        res.status(400).send({ message: "Customer Data Not Deleted" });
    }
}

async function CustomerLeadsPerMonth(req, res) {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    const customers = await CustomerModel.find({
        CreatedAt: { $gte: startOfMonth, $lte: endOfMonth }
    });
    if (customers.length > 0) {
        res.status(200).send(customers);
    } else {
        res.status(400).send({ message: "Customer Data is Empty" })
    }
}
module.exports = {
    AddCustomer,
    ViewAllCustomer,
    ViewCustomer,
    UpdateCustomer,
    DeleteCustomer,
    CustomerLeadsPerMonth
}