import express from "express";
import upload from "../config/fileUpload.js";
import {
    createProduct, 
    GetAllProduct, 
    getProductSingle, 
    updateProduct,
    Deleteproduct} from "../controllers/ProductCntrl.js";
import isAdmin from "../middlewares/isAdmin.js";
import {isLoggedIn} from "../middlewares/isLoggedin.js";

const ProductRouter=express.Router();

ProductRouter.post("/create",isLoggedIn,isAdmin,upload.array('files'),createProduct);
ProductRouter.get("/all",GetAllProduct);
ProductRouter.get("/:id",getProductSingle);
ProductRouter.put("/:id",isLoggedIn,isAdmin,updateProduct);
ProductRouter.delete("/:id/delete",isLoggedIn,isAdmin,Deleteproduct);
export default ProductRouter;