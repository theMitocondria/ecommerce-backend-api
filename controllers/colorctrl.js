import Color from "../model/color.js";
import asyncHandler from "express-async-handler";

export const CreateColor=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    // if exists

    const colorExists=await Color.findOne({name});
    if(colorExists){
        throw new Error("Color already exists")
    }
    const color=await Color.create({
        name:name.toLowerCase(),
        user:req.userAuthId,
    })
    res.json({
        message:"Color created successfully",
        status:"Success",
        color
    })
})

export const allcolor=asyncHandler(async (req,res)=>{
    const color=await Color.find();
    res.status(200).json({
        status:"success",
        message:"Success color",
        color,
    })
})


export const singlecolor=asyncHandler(async (req,res)=>{
    const color=await Color.findById(req.params.id);
    res.status(200).json({
        status:"success",
        message:"Success color single",
        color,
    })
})


export const updateColor=asyncHandler(async (req,res)=>{
    const {name}=req.body;
    const color=await Color.findByIdAndUpdate(
        req.params.id,{
            name
        },{
            new:true
        }
    );
    res.status(200).json({
        status:"success",
        message:"Updated color",
        color,
    })
})

export const Deletecolor=asyncHandler(async (req,res)=>{
   await Color.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"success",
        message:"delted category",
    })
})

