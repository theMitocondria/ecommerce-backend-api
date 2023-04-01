import mongoose from "mongoose";
const schema=mongoose.Schema;

const CouponSchema= new schema({
    code:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
        default:1,
        min:1,
        max:99,
    },
    user:{
        type: schema.Types.ObjectId,
        ref:"User",
    }
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
});

CouponSchema.virtual("Expired").get(function(){
    //console.log(this.endDate,Date.now());
    return this.endDate<Date.now();
    
})

CouponSchema.virtual("days left").get(function(){
    //console.log(this.endDate,Date.now());
   const days=Math.ceil((this.endDate-Date.now())/(1000*60*60*24))+" Days Left";
   return days
    
})

CouponSchema.pre("validate",function(next){
    if(this.endDate<this.startDate){
        next(new Error("end date is less than start date"));
    }

    next(); 
});



CouponSchema.pre("validate",function(next){
    if(this.endDate<Date.now()){
        next(new Error("end date is less than today"));
    }

    next(); 
});

const Coupon=mongoose.model("Coupon",CouponSchema);
export default Coupon;