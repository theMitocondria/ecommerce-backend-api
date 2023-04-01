import express from "express";
import { getAllordersCtrl, getSalesSum, getSingleOrderCtrl, OrderCreate, updateOrderCtrl } from "../controllers/OrderCntrl.js";
import isAdmin from "../middlewares/isAdmin.js";
import {isLoggedIn} from "../middlewares/isLoggedin.js";

const OrderRouter=express.Router();

OrderRouter.post("/",isLoggedIn,isAdmin,OrderCreate)
OrderRouter.get("/",isLoggedIn,getAllordersCtrl)
OrderRouter.put("/update/:id",isLoggedIn,isAdmin,updateOrderCtrl)
OrderRouter.get("/:id",isLoggedIn,getSingleOrderCtrl)
OrderRouter.get("/sales/sum",isLoggedIn,getSalesSum)

export default OrderRouter;