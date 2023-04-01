import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";

export const CreateCategory=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    // if exists

    const category=await Category.findOne({name});
    if(category){
        throw new Error("Category already exists")
    }
    const categry=await Category.create({
        name:name.toLowerCase(),
        user:req.userAuthId,
        image:req.file.path,
    })
    res.json({
        message:"Category created successfully",
        status:"Success",
        categry
    })
})

export const allCategory=asyncHandler(async (req,res)=>{
    const category=await Category.find();
    res.status(200).json({
        status:"success",
        message:"Success category",
        category,
    })
})


export const singleCategory=asyncHandler(async (req,res)=>{
    const category=await Category.findById(req.params.id);
    res.status(200).json({
        status:"success",
        message:"Success category single",
        category,
    })
})


export const updateCategory=asyncHandler(async (req,res)=>{
    const {name}=req.body;
    const category=await Category.findByIdAndUpdate(
        req.params.id,{
            name
        },{
            new:true
        }
    );
    res.status(200).json({
        status:"success",
        message:"Updated category",
        category,
    })
})

export const DeleteCategory=asyncHandler(async (req,res)=>{
   await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"success",
        message:"delted category",
    })
})

