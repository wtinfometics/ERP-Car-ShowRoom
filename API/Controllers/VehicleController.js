const VehicleModel = require("../Models/VehicleModel");
const { Validator } = require("node-input-validator");

async function AddVehicle(req, res) {
    const validate = new Validator(req.body, {
        model_name: "required|string",
        variant: "required|string",
        color: "required|string",
        stock_quantity: "required|numeric",
        vin_number: "required|string",
        Price: "required|numeric"
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).json(validate.errors);
    } else {
        const formdata = {
            model_name: req.body.model_name,
            variant: req.body.variant,
            color: req.body.color,
            stock_quantity: req.body.stock_quantity,
            vin_number: req.body.vin_number,
            Price: req.body.Price
        }
        const AddVehicle = new VehicleModel(formdata);
        const SaveVehicle = await AddVehicle.save();
        if (SaveVehicle) {
            res.status(200).send({ message: "Vehicle Data is Added" })
        } else {
            res.status(400).send({ message: "Vehicle Data Not Added" })
        }
    }
}

async function ViewAllVehicles(req, res) {
    const Vehicles = await VehicleModel.find();
    if (Vehicles.length > 0) {
        res.status(200).json(Vehicles)
    } else {
        res.status(400).send({ message: "Vehicles Data is Empty" })
    }
}

async function ViewVehicle(req, res) {
    const id = req.params.id;
    const Vehicle = await VehicleModel.findById(id);
    if (Vehicle) {
        res.status(200).send(Vehicle)
    } else {
        res.status(400).send({ message: "Vehicle Data Not Exists" })
    }
}

async function UpdateVehicle(req, res) {
    const validate = new Validator(req.body, {
        model_name: "required|string",
        variant: "required|string",
        color: "required|string",
        stock_quantity: "required|numeric",
        vin_number: "required|string",
        Price: "required|numeric"
    });
    const matched = await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const id = req.params.id;
        const formdata = {
            model_name: req.body.model_name,
            variant: req.body.variant,
            color: req.body.color,
            stock_quantity: req.body.stock_quantity,
            vin_number: req.body.vin_number,
            Price: req.body.Price
        }
        const UpdateVehicle = await VehicleModel.findByIdAndUpdate(id, formdata);
        if (UpdateVehicle) {
            res.status(200).send({ message: "Vehicle Data is Updated" })
        } else {
            res.status(400).send({ message: "Vehicle Data Not Updated" })
        }
    }
}

async function DeleteVehicle(req, res) {
    const id = req.params.id;
    const DeleteVehicle = await VehicleModel.findByIdAndDelete(id);
    if (DeleteVehicle) {
        res.status(200).send({ message: "Vehicle Data is Deleted" })
    } else {
        res.status(400).send({ message: "Vehicle Data Not Deleted" })
    }
}

async function CalculateVehicleAmount(req,res) {
    const id = req.params.id;
    const vehicle = await VehicleModel.findById(id);

    if (!vehicle) {
        return res.status(404).send({ message: "Vehicle data does not exist." });
    }

    const price = vehicle.Price;
    let taxRate = price > 900000 ? 42 : 28;

    const rtoCharge = (price * 10) / 100;
    const insurance = (price * 15) / 100;
    const tax = (price * taxRate) / 100;
    const total = price + rtoCharge + insurance + tax;

    const data = {
        Subtotal: price,
        RtoCharge: rtoCharge,
        Insurance: insurance,
        Tax: tax,
        Total: total,
        VehicleID: id
    };

    res.status(200).json(data);
}

module.exports = {
    AddVehicle,
    ViewAllVehicles,
    ViewVehicle,
    UpdateVehicle,
    DeleteVehicle,
    CalculateVehicleAmount
    
}