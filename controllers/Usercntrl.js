import User from "../model/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler"
import  generateToken  from "../utils/jsonwebtoken.js";
import getTokenFromHeader 
from "../utils/getTokenfromHeader.js"
import verifyToken from "../utils/verifyToken.js";

export const UserRegister=asyncHandler(
    async (req,res)=>{
        //chexk if user existes
        const {fullname,email,password}=req.body;
    
        const userExists=await User.findOne({email});
    
        if(userExists){
            throw new Error("User Already Exists")
        }
        // hashing password;
    
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
    
        const user = await User.create({
            email,
            password:hashedPassword,
            fullname,
        })
    
        await user.save();
    
        res.status(201).json({
            message:"User Registration Successful",
            data:user,
            status:"success",
        })
    }
)

export const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;

    // find user in db

    const userFound=await User.findOne({email});
    
    if(userFound  &&  await bcrypt.compare(password,userFound?.password)){
         return res.json({
            status:"success",
            message:"Loginned Successfully",
            userFound,
            token:generateToken(userFound?._id),
        })
    }else{
        throw new Error("Invalid Login Credentials")
    }

    
});



export const getProfile=asyncHandler(async (req,res)=>{
   // find the user
   const user=await User.findById(req.userAuthId).populate("orders");
   console.log(user);
    res.json({
        message:"Get Profile working",
        user,
    })
});

// address mngna
export const UpdateShippingAddress=asyncHandler(async(req,res)=>{
    const {Country,Province,PostalCode,Address,LastName,firstName}=req.body;
    console.log(req.body);
    let user=await User.findByIdAndUpdate(req.userAuthId,{
        ShippingAddress:{
            Country,
            Province,
            PostalCode,
            Address,
            LastName,
            firstName
        },
        hasShippingAddress:true
    },{new:true});
    await user.save();
    res.status(200).json({
        success:true,
        message:"adress updated successfully",
        user,
    })
})