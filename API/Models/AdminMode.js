const mongoose=require("mongoose");

const AdminModel=mongoose.Schema({
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
    EmailId:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    }    ,
    UpdatedAt:{
        type:Date,
        default:Date.now
    }    
});

module.exports=mongoose.model("Admin",AdminModel);