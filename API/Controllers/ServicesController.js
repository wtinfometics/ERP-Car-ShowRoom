const ServiceModel=require("../Models/ServiceModel");
const {Validator}=require("node-input-validator");
const moment = require('moment');
async function AddService(req,res) {
    const validate=new Validator(req.body,{
        CustomerName:"required|string",
        RegNumber:"required|string",
        AppointMentDate:"required|string",
    });
    const matched=await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const formdata={
            CustomerName:req.body.CustomerName,
            RegNumber:req.body.RegNumber,
            AppointMentDate:req.body.AppointMentDate,
        
        }
        const AddService=new ServiceModel(formdata);
        const SaveService=await AddService.save();
        if (SaveService) {
            res.status(200).send({message:"Service Data is Added"});
        } else {
            res.status(400).send({message:"Service Data Not Added"});
        }
    }
}

async function ViewAllServices(req,res) {
    const Services=await ServiceModel.find();
    if (Services.length>0) {
        res.send(Services)
    } else {
        res.send({message:"Services Data is Empty"})
    }
}

async function ViewService(req,res) {
    const id=req.params.id;
    const Service=await ServiceModel.findById(id);
    if (Service) {
        res.status(200).send(Service);
    } else {
        res.status(400).send({message:"Service Data Not Exists"});
    }
}

async function UpdateService(req,res) {
    const validate=new Validator(req.body,{
        CustomerName:"required|string",
        RegNumber:"required|string",
        AppointMentDate:"required|string",
    });
    const matched=await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const id=req.params.id;
        const formdata={
            CustomerName:req.body.CustomerName,
            RegNumber:req.body.RegNumber,
            AppointMentDate:req.body.AppointMentDate,
        
        }
        const UpdateService=await ServiceModel.findByIdAndUpdate(id,formdata);
        if (UpdateService) {
            res.status(200).send({message:"Service Data is Updated"});
        } else {
            res.status(400).send({message:"Service Data Not Updated"});
        }
    }
}

async function DeleteService(req,res) {
    const id=req.params.id;
    const DeleteService=await ServiceModel.findByIdAndDelete(id);
    if (DeleteService) {
        res.status(200).send({message:"Service Data is Deleted"});
    } else {
        res.status(400).send({message:"Service Data Not Deleted"});
    }
}

async function servicespermonth(req,res) {
       const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();
    
        const customers = await ServiceModel.find({
            CreatedAt: { $gte: startOfMonth, $lte: endOfMonth }
        });
        if (customers.length > 0) {
            res.status(200).send(customers );
        } else {
            res.status(400).send({ message: "Customer Data is Empty" })
        }
} 

module.exports={
    AddService,
    ViewAllServices,
    ViewService,
    UpdateService,
    DeleteService,
    servicespermonth
}