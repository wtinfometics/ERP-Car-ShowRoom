const InventoryModel=require("../Models/InventoryModel");
const {Validator}=require("node-input-validator");
const fs = require('fs');
const path = require('path');
const { model } = require("mongoose");

// Add Inventory Product
async function AddInventoryProduct(req,res) {
    const validate=new Validator(req.body,{
        name:"required|string",
        description:"required|string",
        price:"required|string",
        stocks:"required|string",
    });
    const matched=await validate.check();
    const errors = validate.errors || {};

    if (!req.file) {
        errors.productimange = { message: "Inventory Image is required" };
    }

    if (!matched || !req.file) {
        return res.status(422).send(errors);
    } else {
        const ProductData={
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            stocks:req.body.stocks,
            image:req.file.filename
        }
               const AddProduct = new InventoryModel(ProductData);
                const SaveInventoryProduct = await AddProduct.save();
                if (SaveInventoryProduct) {
                    res.send({ message: "Product Saved Successfully" }).status(200)
                } else {
                    res.send({ message: "Product  Not Saved" }).status(400)
                }
    }
}

// View all Inventory Product
async function GetAllInventoryProducts(req,res) {
    const InventoryProducts=await InventoryModel.find();
    if (InventoryProducts.length>0) {
        res.send(InventoryProducts).status(200);
    } else {
        res.send({message:"Inventory Product is Empty"}).status(400);
    }
}

// View Inventory Product
async function GetInventoryProduct(req,res) {
    const id=req.params.id;
    const InventoryProduct=await InventoryModel.findById(id);
    if (InventoryProduct) {
        res.send(InventoryProduct).status(200);
    } else {
        res.send({message:"Inventory Product is Not Exists"}).status(404);
    }
}


// UpdateInventory Product
async function UpdateInventoryProduct(req,res) {
    const id=req.params.id;
    const validate=new Validator(req.body,{
        name:"required|string",
        description:"required|string",
        price:"required|string",
        stocks:"required|string",
    });
    const matched=await validate.check();
    const errors = validate.errors || {};

  

    if (!matched ) {
        return res.status(422).send(errors);
    } else {
        const ProductData={
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            stocks:req.body.stocks,
        }
        if (req.file !== undefined) {
            await DeleteInventoryProductImage(id);
            ProductData.image=req.file.filename;
        }
       const UpdateInventory=await InventoryModel.findByIdAndUpdate(id,ProductData);
       if (UpdateInventory) {
        res.send({message:"Inventory Product Updated"}).status(200);
       } else {
        res.send({message:"Inventory Product Not Updated"}).status(400);
       }
    }
}

// Delete Inventory Product
async function DeleteInventoryProduct(req,res) {
    const id=req.params.id;
    const Product=await InventoryModel.findById(id);
    if (Product) {
        await DeleteInventoryProductImage(id);
        const DeleteInventoryProduct=await InventoryModel.findByIdAndDelete(id);
        if (DeleteInventoryProduct) {
             res.send({message:"Inventory Product Deleted"}).status(200)
        } else {
             res.send({message:"Inventory Product Not Deleted"}).status(400)
        }
    } else {
        res.send({message:"Inventory Product Not Exists"}).status(404)
    }
}

// Update Inventory Stock Product
async function UpdateInventoryProductStocks(req,res) {
    const id=req.params.id;
    const validate=new Validator(req.body,{
       status:"required"
    });
    const matched=await validate.check();
    if (matched) {
        res.send(validate.errors).status(422);
    } else {
        const UpdateStatus=await InventoryModel.findByIdAndUpdate(id,{status:req.body.status});
        if (UpdateStatus) {
            res.send({message:"Product status Updated"}).status(200);
        } else {
            res.send({message:"Product status Not Updated"}).status(400);
        }
    }
}

// Delete Inventory Product  Image
async function DeleteInventoryProductImage(id) {
    const Product=await InventoryModel.findById(id);
    if (Product) {
        const dltimage = path.join(__dirname, '../Public/Spares/', Product.image);

        // Delete the image
        fs.unlink(dltimage, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
                resp.send({ error: 'Image is not deleted' });
            } else {
                console.log('Image is deleted');
            }
        });
    } else {
        
    }
}

module.exports={
    AddInventoryProduct,
    GetAllInventoryProducts,
    GetInventoryProduct,
    UpdateInventoryProduct,
    DeleteInventoryProduct,
    UpdateInventoryProductStocks
} 