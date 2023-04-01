import Brand from "../model/Brand.js";
import asyncHandler from "express-async-handler";

export const CreateBrand=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    // if exists

    const aBrandExists=await Brand.findOne({name});
    if(aBrandExists){
        throw new Error("Category already exists")
    }
    const brand=await Brand.create({
        name:name.toLowerCase(),
        user:req.userAuthId,
    })
    res.json({
        message:"Brand created successfully",
        status:"Success",
        brand,
    })
})

export const allBrand=asyncHandler(async (req,res)=>{
    const brand=await Brand.find();
    res.status(200).json({
        status:"success",
        message:"Success Brand",
        brand,
    })
})


export const singleBrand=asyncHandler(async (req,res)=>{
    const brand=await Brand.findById(req.params.id);
    res.status(200).json({
        status:"success",
        message:"Success Brand single",
        brand,
    })
})


export const updateBrand=asyncHandler(async (req,res)=>{
    const {name}=req.body;
    const brand=await Brand.findByIdAndUpdate(
        req.params.id,{
            name
        },{
            new:true
        }
    );
    if(!brand){
        throw new Error("brand not found");
    }
    res.status(200).json({
        status:"success",
        message:"Updated Brand",
        brand,
    })
})

export const DeleteBrand=asyncHandler(async (req,res)=>{
    const brand=await Brand.findById(req.params.id);
    if(!brand){
        throw new Error("Brand does not exist");
    }
   await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"success",
        message:"delted category",
    })
})

