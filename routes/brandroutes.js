import express from "express";
import {CreateBrand,allBrand,singleBrand,DeleteBrand,updateBrand} from "../controllers/Brandctrl.js"
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const BrandRouter=express.Router();

BrandRouter.post("/create",isLoggedIn,isAdmin,CreateBrand);
BrandRouter.get("/all",isLoggedIn,allBrand);
BrandRouter.get("/:id",isLoggedIn,singleBrand);
BrandRouter.delete("/:id/delete",isLoggedIn,isAdmin,DeleteBrand);
BrandRouter.put("/:id",isLoggedIn,isAdmin,updateBrand);


export default BrandRouter;