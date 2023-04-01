import asyncHandler from "express-async-handler";
import Coupon from "../model/coupon.js";

export const createCoupon=asyncHandler(async(req,res)=>{
    const {endDate,startDate,code,discount} = req.body;
    // check admin
    //check if coupon already exists
    const couponExists=await Coupon.findOne({
        code
    })

    if(couponExists){
        throw new Error("Coupon already exists");
    }

    if(isNaN(discount)){
        throw new Error("Discount is not na int");
    }

    const coupon=await Coupon.create({
        code:code?.toUpperCase(),startDate,endDate,discount,user:req.userAuthId
    })
    res.status(200).json({
        message:"Working",
        coupon,
    })
})


export const getAllCOupons=asyncHandler(async(req,res)=>{
    const coupons=await Coupon.find()
    res.json({
        message:"Fetced",
        coupons,
    })
})



export const getSingleCOupons=asyncHandler(async(req,res)=>{
    
    const coupon=await Coupon.findById(req.params.id);

    res.json({
        message:"Fetced single",
        coupon,
    })
})

export const updateCOupons=asyncHandler(async(req,res)=>{
    const {endDate,startDate,code,discount}=req.body;
    const coupon=await Coupon.findByIdAndUpdate(req.params.id,{
        endDate,startDate,code:code?.toUpperCase(),discount
    },{
        new:true,
    });
    
    if(!coupon){
        throw new Error("no such coupon")
    }
    res.json({
        message:"Updated coupon successfully",
        coupon,
    })
})



export const deleteCOupons=asyncHandler(async(req,res)=>{
    const coupon=await Coupon.findByIdAndDelete(req.params.id);
    if(!coupon){
        throw new Error("no such coupon")
    }
    res.json({
        message:"Deleted coupon successfully",
    })
})