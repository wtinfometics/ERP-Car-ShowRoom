const mongoose=require("mongoose");

const QuotationsModel=mongoose.Schema({
    Firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    MobileNum:{
        type:String,
        required:true
    },
    VehicleID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true
    },  
    Price:{
        type:Number,
        required:true
    },  
    Status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
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

module.exports=mongoose.model("Quotations",QuotationsModel);