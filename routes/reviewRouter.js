import Express from "express";
import { createReview } from "../controllers/ReviewCntrl.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const reviewRouter=Express.Router();

reviewRouter.post("/:id",isLoggedIn,createReview)
export default reviewRouter;