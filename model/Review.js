import mongoose from "mongoose";
const Schema= mongoose.Schema;

const ReviewSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Review must belong to a user"]
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true,"Review must belong to a Product"]
    },
    message:{
        type:String,
        required:[true,"Please Add a mesage"]
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,"Please add a rating"]
    }
},{
    timestamps:true,
})

const Review=mongoose.model("Review",ReviewSchema);
export default Review;