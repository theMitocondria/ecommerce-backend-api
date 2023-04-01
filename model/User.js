import mongoose from "mongoose";
const Schema =mongoose.Schema;

const UserSchema=new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    hasShippingAddress:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    ShippingAddress:{
       firstName:{
        type:String,
       },
       LastName:{
        type:String,
       },
       Address:{
        type:String,
       },
       PostalCode:{
        type:Number,
       },
       Province:{
        type:String,
       },
       Country:{
        type:String,
       }
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order",
        }
    ],
    wishList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"WishList",
        }
    ]
},{
    timestamps:true
});

const User=new mongoose.model("User",UserSchema);

export default  User;
