import Express from "express";
import { createCoupon ,getAllCOupons ,updateCOupons,deleteCOupons,getSingleCOupons} from "../controllers/COuponCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";
import {isLoggedIn} from "../middlewares/isLoggedin.js";

const couponRouter=Express.Router();

couponRouter.post("/create",isLoggedIn,isAdmin,createCoupon)
couponRouter.get("/all",getAllCOupons)
couponRouter.get("/:id",getSingleCOupons)
couponRouter.put("/update/:id",isLoggedIn,isAdmin,updateCOupons);
couponRouter.delete("/delete/:id",isLoggedIn,isAdmin,deleteCOupons)
export default couponRouter;