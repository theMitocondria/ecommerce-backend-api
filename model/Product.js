import mongoose from "mongoose";

const Schema=mongoose.Schema;

const ProductSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    price:{
        type:Number,
        required:true,
    },
    sizes:{
        type:[String],
        enum:["XS","S","M","L","XL","XXL"],
        required:true,
    },
    colors:{
        type:[String],
        required:true,
    },
    category:{
        type:String,
        ref:"Category",
        required:"true"

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    images:[
        {
            type:String,
            required:true,
        },
    ],
    TotalQty:{
        type:Number,
        required:true,
    },
    TotalSold:{
        type:Number,
        required:true,
        default:0
    }
},
{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
});
// qty left
ProductSchema.virtual("qtyLeft").get(function(){
    const product=this;
    return product.TotalQty-product.TotalSold;
})

ProductSchema.virtual('totalReviews').get(function(){
    //console.log(this);
    const product=this;
    return product?.reviews?.length;

})

// average rating

ProductSchema.virtual('averagerting').get(function(){
    let ratto=0;
    const product=this
    product?.reviews.forEach((review)=>{
        ratto+=review?.rating;
    });
    const averageRating=Number(ratto/product?.reviews?.length).toFixed(1);
    return averageRating;
})
const Product=mongoose.model("Product",ProductSchema);

export default Product;