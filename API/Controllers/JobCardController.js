const JobCardModel=require("../Models/JobCardModel");
const {Validator}=require("node-input-validator");

async function AddJobCard(req,res) {
    const validate=new Validator(req.body,{
        ServiceId:"required|string",
        Description:"required|string",
    });
    const matched=await validate.check();
    if (!matched) {
        res.send(validate.errors).status(422);
    } else {
        const formdata={
            ServiceId:req.body.ServiceId,
            Description:req.body.Description,
        }
        const AddJobCard=new JobCardModel(formdata);
        const SaveJobCard=await AddJobCard.save();
        if (SaveJobCard) {
            res.send({message:"JobCard Data is Added"}).status(200)
        } else {
            res.send({message:"JobCard Data Not Added"}).status(400)
        }
    }
}

async function ViewAllJobCards(req,res) {
    const JobCards=await JobCardModel.find();
    if (JobCards.length>0) {
        res.send(JobCards).status(200)
    } else {
        res.send({message:"JobCards Data is Empty"}).status(400)
    }
}

async function ViewJobCard(req,res) {
    const id=req.params.id;
    const JobCard=await JobCardModel.findById(id);
    if (JobCard) {
        res.send(JobCard).status(200)
    } else {
        res.send({message:"JobCard Data Not Exists"}).status(400)
    }
}

async function UpdateJobCard(req,res) {
    const validate=new Validator(req.body,{
        ServiceId:"required|string",
        Description:"required|string",
    });
    const matched=await validate.check();
    if (!matched) {
        res.send(validate.errors).status(422);
    } else {
        const id=req.params.id;
        const formdata={
            ServiceId:req.body.ServiceId,
            Description:req.body.Description,
        }
        const UpdateJobCard=await JobCardModel.findByIdAndUpdate(id,formdata);
        if (UpdateJobCard) {
            res.send({message:"JobCard Data is Updated"}).status(200)
        } else {
            res.send({message:"JobCard Data Not Updated"}).status(400)
        }
    }
}

async function DeleteJobCard(req,res) {
    const id=req.params.id;
    const DeleteJobCard=await JobCardModel.findByIdAndDelete(id);
    if (DeleteJobCard) {
        res.send({message:"JobCard Data is Deleted"}).status(200)
    } else {
        res.send({message:"JobCard Data Not Deleted"}).status(400)
    }
}

module.exports={
    AddJobCard,
    ViewAllJobCards,
    ViewJobCard,
    UpdateJobCard,
    DeleteJobCard
}