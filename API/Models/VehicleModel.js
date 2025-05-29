const mongoose = require("mongoose");

const VehicleModel = mongoose.Schema({
    model_name: {
        type: String,
        required: true,
    },
    variant: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    stock_quantity: {
        type: Number,
        required: true
    },
    vin_number: {
        type: String,
        default: true,
    },
    Price: {
        type: Number,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Vehicle", VehicleModel);