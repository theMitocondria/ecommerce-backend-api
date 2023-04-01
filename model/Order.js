import mongoose  from "mongoose";
const Schema=mongoose.Schema;
// generate random numbers
const randomTxt=Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumber=Math.floor(1000+Math.random()*90000);
//schema
const orderSchema =new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    orderItems:[
        {
            type:Object,
            required:true,
        },
    ],
    shippingAddress:{
        type:Object,
        required:true,
    },
    orderNumber:{
        type:String,
        required:true,
        default: randomNumber+randomTxt,
    },

    // for stripe.js
    paymentStatus:{
        type:String,
    
        default:"Not Paid",
    },
    totalPrice:{
        type:Number,
    
        default:0.0,
    },
    paymentMethods:{
        type:String,
   
        default:"Not SPecified"
    },
    currency:{
        type:String,
        default:"Not SPecified"
    },
    // admin ke liye h ye
    status:{
        type:String,
        default:"Pending",
        enum:["Pending","processing","shipped","delivered"],
    },
    deliveredAt:{
        type:Date,
    }
},{
    timestamps:true,
})

const Order= mongoose.model("Order",orderSchema);
export default Order;