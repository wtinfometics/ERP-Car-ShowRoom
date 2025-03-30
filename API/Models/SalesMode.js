const mongoose=require("mongoose");

const SalesModel=mongoose.Schema({

    VehicleID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true
    },  
    CustomerName:{
        type:String,
        required:true
    },
    ModileNumber:{
        type:Number,
        required:true
    },  
    Address:{
        type:String,
        required:true
    },
    Street:{
        type:String,
        required:true,
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true,
    },
    Pincode:{
        type:Number,
        required:true
    },
    Subtotal:{
        type:Number,
        required:true
    },  
    RtoCharge:{
        type:Number,
        required:true
    },  
    Insurance:{
        type:Number,
        required:true
    },  
    Tax:{
        type:Number,
        required:true
    },  
    Total:{
        type:Number,
        required:true
    },  
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    UpdatedAt:{
        type:Date,
        default:Date.now
    }    
});

module.exports=mongoose.model("Sale",SalesModel);