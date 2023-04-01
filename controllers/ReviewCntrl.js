import Review from "../model/Review.js";
import asynchandler from "express-async-handler";
import Product from "../model/Product.js";

export const createReview=asynchandler(async(req,res)=>{
    const {product,message,rating} = req.body;

    //find product
    const {id} = req.params;

    const productFound = await Product.findById(id).populate("reviews");
    if(!productFound){
        throw new Error("Product not founnd");
    }
    // check if user already reviewed
    const hasreviewed=productFound?.reviews?.find((r)=>{
        return r?.user?.toString()===req?.userAuthId?.toString();
    });

    if(hasreviewed){
        throw new Error("YOU have already reviewded");
    }
    
    const review = await Review.create({
        message,
        product:productFound?._id,
        rating,
        user:req.userAuthId
    });

    productFound.reviews.push(review);
    await productFound.save();
    res.json({
        message:"review created successfully",
        status:"Success"
    })
})