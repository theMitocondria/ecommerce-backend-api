import express from "express";
import { getProfile, loginUser, UserRegister , UpdateShippingAddress} from "../controllers/Usercntrl.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const userRoutes=express.Router();

userRoutes.post("/register",UserRegister);
userRoutes.post("/login",loginUser);
userRoutes.get("/getprofile",isLoggedIn ,getProfile);
userRoutes.put("/update/shipping",isLoggedIn ,UpdateShippingAddress);

export default userRoutes;