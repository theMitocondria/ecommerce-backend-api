import Order from "../model/Order.js";
import asynchandler from "express-async-handler";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Coupon from "../model/coupon.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
//stripe
const stripe=new Stripe(process.env.STRIPE_KEY);

export const OrderCreate=asynchandler(async(req,res)=>{
    // applying coupon
    // const {coupon}=req?.query;

    // const couponFound=await Coupon.findOne({
    //     code:coupon?.toUpperCase()
    // })
    // if(!couponFound){throw new Error("Coupon does not exist")}
    // if(couponFound?.Expired){throw new Error("Coupon has expired")}

    // get the payload:things we need for creation of order:user,orderitems,shippingaddress,totalprice
    const {orderItems,totalPrice,shippingAddress}=req.body;
    
    //find user
    //console.log(orderItems,totalPrice,shippingAddress);
    const user=await User.findById(req.userAuthId);
    
    //check if order is not empty then place;
    //check if user has shipping address
    if(!user?.hasShippingAddress){
        throw new Error("Please Provide address")
    }

    if(orderItems?.length<=0){
        throw new Error("No order Items");
    }

    // save it to db
    const order=await Order.create({
        user:user?._id,
        orderItems,
        shippingAddress,
        totalPrice,
    })
    //console.log(order);
    // push orderinto user
    user.orders.push(order);
    await user.save();

    // update qty , sold

    const products =await Product.find({_id:{$in:orderItems}})
    //console.log(products);
    orderItems?.map(async (order)=>{
        const product=products?.find((product)=>{
            return product?._id.toString()=== order?._id.toString();
        });

        if(product){
            product.TotalSold+=order.qty;
            product.TotalQty-=order.qty;
        };

        await product.save();
    })

    const convertedOrders=orderItems.map((item)=>{
        return{
            price_data:{
                currency:"INR",
                product_data:{
                    name:item?.name,
                    description:item?.description,
                },
                unit_amount:item?.price*100,
            },
            quantity:item?.qty,
        }
    });
    // make payment stripe
    const session= await stripe.checkout.sessions.create({
        line_items:convertedOrders,
        metadata:{
            orderId:JSON.stringify(order?._id),
        },
        mode:"payment",
        success_url:"http://localhost:4000/success",
        cancel_url:"http://localhost:4000/cancel",
    });
    res.send({url:session.url})
    // payment webhook
    //update user orders
})


export const getAllordersCtrl = asynchandler(async (req, res) => {
    //find all orders
    const orders = await Order.find().populate("user");
    res.json({
      success: true,
      message: "All orders",
      orders,
    });
  });
  
  
  export const getSingleOrderCtrl = asynchandler(async (req, res) => {
    //get the id from params
    const id = req.params.id;
    const order = await Order.findById(id);
    //send response
    res.status(200).json({
      success: true,
      message: "Single order",
      order,
    });
  });
  

  
  export const updateOrderCtrl = asynchandler(async (req, res) => {
    //get the id from params
    const id = req.params.id;
    //update
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Order updated",
      updatedOrder,
    });
  });
// get sum of order
export const getSalesSum=asynchandler(async (req,res)=>{
    const sales=await Order.aggregate([
        {
            $group:{
                _id:null,
                totalSales:{
                    $sum:"$totalPrice",
                }
            }
        }
    ])
     res.status(200).json({
        success:true,
        message:"sum of orders",
        sales,
     })
})