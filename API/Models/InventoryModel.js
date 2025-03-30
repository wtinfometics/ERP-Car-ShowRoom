const mongoose=require("mongoose");

const AdminModel=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    stocks:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true,
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

module.exports=mongoose.model("Inventory",AdminModel);