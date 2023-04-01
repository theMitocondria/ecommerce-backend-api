import express from "express";
import { Deletecolor,updateColor,singlecolor,allcolor,CreateColor} from "../controllers/colorctrl.js";
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const ColorRouter=express.Router();

ColorRouter.post("/create",isLoggedIn,isAdmin,CreateColor);
ColorRouter.get("/all",isLoggedIn,allcolor);
ColorRouter.get("/:id",isLoggedIn,singlecolor);
ColorRouter.delete("/:id/delete",isLoggedIn,isAdmin,Deletecolor);
ColorRouter.put("/:id",isLoggedIn,isAdmin,updateColor);


export default ColorRouter;