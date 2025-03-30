const mongoose=require("mongoose");

const JobCardModel=mongoose.Schema({

    ServiceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Services",
        required:true
    },
    Description:{
        type:String,
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

module.exports=mongoose.model("JobCard",JobCardModel);