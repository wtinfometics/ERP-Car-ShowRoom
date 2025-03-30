const QuotationModel=require("../Models/QuotationsModel");
const {Validator}=require("node-input-validator");

async function AddQuotation(req,res) {
    const validate=new Validator(req.body,{
        Firstname:"required|string",
        lastname:"required|string",
        MobileNum:"required|numeric|digits:10",
        VehicleID:"required|string",
        Price:"required|numeric",
        Status:"required|string",
    });
    const matched=await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const formdata={
            Firstname:req.body.Firstname,
            lastname:req.body.lastname,
            MobileNum:req.body.MobileNum,
            VehicleID:req.body.VehicleID,
            Price:req.body.Price,
            Status:req.body.Status
        }
        const AddQuotation=new QuotationModel(formdata);
        const SaveQuotation=await AddQuotation.save();
        if (SaveQuotation) {
            res.status(200).send({message:"Quotation Data is Added"});
        } else {
            res.status(400).send({message:"Quotation Data Not Added"});
        }
    }
}

async function ViewAllQuotations(req,res) {
    const Quotations=await QuotationModel.find() .populate('VehicleID').exec();;
    if (Quotations.length>0) {
        res.status(200).send(Quotations);
    } else {
        res.status(400).send({message:"Quotations Data is Empty"});
    }
}

async function ViewQuotation(req,res) {
    const id=req.params.id;
    const Quotation=await QuotationModel.findById(id);
    if (Quotation) {
        res.send(Quotation).status(200)
    } else {
        res.send({message:"Quotation Data Not Exists"}).status(400)
    }
}

async function UpdateQuotation(req,res) {
    const validate=new Validator(req.body,{
         Firstname:"required|string",
        lastname:"required|string",
        MobileNum:"required|numeric|digits:10",
        VehicleID:"required|string",
        Price:"required|numeric",
        Status:"required|string",
    });
    const matched=await validate.check();
    if (!matched) {
        res.status(422).send(validate.errors);
    } else {
        const id=req.params.id;
        const formdata={
            Firstname:req.body.Firstname,
            lastname:req.body.lastname,
            MobileNum:req.body.MobileNum,
            VehicleID:req.body.VehicleID,
            Price:req.body.Price,
            Status:req.body.Status
        }
        const UpdateQuotation=await QuotationModel.findByIdAndUpdate(id,formdata);
        if (UpdateQuotation) {
            res.status(200).send({message:"Quotation Data is Updated"})
        } else {
            res.status(400).send({message:"Quotation Data Not Updated"})
        }
    }
}

async function DeleteQuotation(req,res) {
    const id=req.params.id;
    const DeleteQuotation=await QuotationModel.findByIdAndDelete(id);
    if (DeleteQuotation) {
        res.status(200).send({message:"Quotation Data is Deleted"});
    } else {
        res.status(400).send({message:"Quotation Data Not Deleted"});
    }
}

module.exports={
    AddQuotation,
    ViewAllQuotations,
    ViewQuotation,
    UpdateQuotation,
    DeleteQuotation
}