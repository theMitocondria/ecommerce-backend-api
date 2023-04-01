import express from "express";
import Categoryupload from "../config/categoryfileupload.js";
import { CreateCategory ,allCategory,singleCategory ,DeleteCategory,updateCategory} from "../controllers/CategoryCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const categoryRouter=express.Router();

categoryRouter.post("/create",isLoggedIn,isAdmin,Categoryupload.single("file"),CreateCategory);
categoryRouter.get("/all",isLoggedIn,allCategory);
categoryRouter.get("/:id",isLoggedIn,singleCategory);
categoryRouter.delete("/:id/delete",isLoggedIn,isAdmin,DeleteCategory);
categoryRouter.put("/:id",isLoggedIn,isAdmin,updateCategory);


export default categoryRouter;