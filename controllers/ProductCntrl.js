import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js"

export const createProduct=asyncHandler(async (req,res)=>{
    console.log(req.files);
    const {name,brand,description,price,sizes,colors,category,TotalQty} = req.body;
    const convertedImgs = req.files.map((file) => file?.path);
    const ProductExists=await Product.findOne({ name });
    if(ProductExists){
        throw new Error("Product already Exists");
    }

    // check which category
    const categoryFound=await Category.findOne({name:category.toLowerCase()});

    if(!categoryFound){
        throw new Error("PLease provide right category");
    }

    // check brand

    const BrandFound=await Brand.findOne({name:brand.toLowerCase()});

    if(!BrandFound){
        throw new Error("PLease provide right Brand");
    }

    const product= await Product.create({
        name,
        brand,
        description,
        price,
        sizes,
        colors,
        category,
        user:req.userAuthId,
        TotalQty,
        images:convertedImgs,
    });
    // push in producrts arry
    categoryFound.products.push(product);
    //saving it
    categoryFound.save();

    // push in brand array
    BrandFound.products.push(product);
    // saving it
    BrandFound.save();
    res.status(200).json({
        message:"Product created Successfully",
        product,
    })

})

export const GetAllProduct = asyncHandler(async (req,res)=>{
    let product=  Product.find();

    //by name
    if(req.query.name){
        product=product.find({name:{$regex:req.query.name,$options:"i"}});
    }
   
    // by brand
    if(req.query.brand){
        product=product.find({brand:{$regex:req.query.brand,$options:"i"}});
    }

    // by category
    if(req.query.category){
        product=product.find({category:{$regex:req.query.category,$options:"i"}});
    }
    
    // by color
    if(req.query.colors){
        product=product.find({colors:{$regex:req.query.colors,$options:"i"}});
    }
    
    //by sizes
    if(req.query.sizes){
        product=product.find({sizes:{$regex:req.query.sizes,$options:"i"}});
    }

    // by price
    if(req.query.price){
        const priceRange=req.query.price.split("-");
        console.log(priceRange)
        product=product.find({price:{$gte:priceRange[0],$lte:priceRange[1]}});
    }

    // page
    const page=parseInt(req.query.page)?parseInt(req.query.page):1;
    //limit
    const limit=parseInt(req.query.limit)?parseInt(req.query.limit):10;

    // start index
    const startInd=(page-1)*limit;

    const endInd=page*limit;

    const total=await Product.countDocuments();

    product=product.skip(startInd).limit(limit);
    
    const Pagination={};

    if(endInd<total){
        Pagination.next={
            page:page+1,
            limit,
        }
    }

    if(startInd>0){
        Pagination.prev={
            page:page-1,
            limit,
        }
    }
    const f=await product.populate("reviews");
    res.status(200).json({
        message:"productsfetvhedsuvccwssfully",
        status:"Success",
        results:f.length,
        total,
        Pagination,
        f,
    })
})



// get single product

export const getProductSingle=asyncHandler(async (req,res)=>{
    const product=await Product.findById(req.params.id).populate("reviews");
    if(!product){
        throw new Error("Product not found");
    }
    else{
        res.status(200).json({
            message:"Product fetched successfully",
            product,
            status:"success"
        })
    }
})

// update product

export const updateProduct=asyncHandler(async (req,res)=>{
    const {
        name,
        brand,
        description,
        price,
        sizes,
        colors,
        category,
        TotalQty
    }=req.body;

    const product=await Product.findByIdAndUpdate(req.params.id,{
        name,
        brand,
        description,
        price,
        sizes,
        colors,
        category,
        TotalQty
    },{
        new:true
    })

    res.status(200).json({
        message:"Product updated successfully",
        product,
        status:"success"
    })
})


// deleteing product

export const Deleteproduct=asyncHandler(async (req,res)=>{
    const product=await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"Success",
        message:"Deleted"
    })
})