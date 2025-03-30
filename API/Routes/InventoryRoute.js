const express=require("express");
const bodyparser=require("body-parser");
const multer=require('multer');
const path=require('path');
const Inventory=express();

const AuthMiddleware=require("../Middleware/AuthMiddleware")
const InventoryController=require("../Controllers/InventoryController");

Inventory.use(bodyparser.json());
Inventory.use(bodyparser.urlencoded({extended:true}));

Inventory.use(express.static("Public"));
//store inventory product Images
const InventoryStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../Public/Spares"),function(error,success){
            if (error) {
                console.log("Destination error",error.message);
            }
        });
    },
    filename:function(req,file,cb){
        const inventoryimage=`${Date.now()}_${req.body.name}${path.extname(file.originalname)}`;
        cb(null,inventoryimage,function(error,success){
            if (error) {
                console.log("filename error",error.message);
            }
        });
    }
});

const upload=multer({storage:InventoryStorage});

Inventory.post("/storeinventory",AuthMiddleware("admin","sales-ref","manager"),upload.single('productimange'),InventoryController.AddInventoryProduct);
Inventory.get("/showcategories",AuthMiddleware("admin","sales-ref","manager"),InventoryController.GetAllInventoryProducts);
Inventory.get("/showinventory/:id",AuthMiddleware("admin","sales-ref","manager"),InventoryController.GetInventoryProduct);
Inventory.post("/updateinventory/:id",AuthMiddleware("admin","sales-ref","manager"),upload.single('productimange'),InventoryController.UpdateInventoryProduct);
Inventory.delete("/deleteinventory/:id",AuthMiddleware("admin","sales-ref","manager"),InventoryController.DeleteInventoryProduct);

module.exports=Inventory;