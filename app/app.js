import Express from "express";
import dbconnect from "../config/dbconnect.js";
import dotenv from "dotenv";
import userRoutes from "../routes/UserRoute.js";
import { globalerrorhandler, notFound } from "../middlewares/globalerrorhandler.js";
import ProductRouter from "../routes/ProductRoute.js";
import categoryRouter from "../routes/CategoryRoute.js";
import BrandRouter from "../routes/brandroutes.js";
import ColorRouter from "../routes/colorroute.js";
import reviewRouter from "../routes/reviewRouter.js";
import OrderRouter from "../routes/OrderROute.js";
import couponRouter from "../routes/couponRoutes.js";
import Stripe from "stripe";
import Order from "../model/Order.js";
import cors from "cors";
dotenv.config();
dbconnect();
 
const app=Express();
app.use(cors({
  origin:"*"
}
))
// stripe webhook
const stripe=new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_10a1455326746e589baf3de35ac583a0ace670b6fc30497b54b421d7beae553b";

app.post('/webhook', Express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  
  if(event.type==='checkout.session.completed'){
    //update the order
    const session=event.data.object;
    const {orderId}=session.metadata;
    const paymentStatus=session.payment_status;
    const paymentMethods=session.payment_method_types[0];
    const totalAmount=session.amount_total;
    const currency=session.currency;
    //find the order
    const order=await Order.findByIdAndUpdate(JSON.parse(orderId),{
      totalPrice:totalAmount/100,
      currency,paymentMethods,paymentStatus
    },{
      new:true
    });
    console.log(order);
  }else{

  }
  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

// taking data
app.use(Express.json());

// routes
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/product',ProductRouter);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/brand',BrandRouter);
app.use('/api/v1/color',ColorRouter);
app.use('/api/v1/review',reviewRouter);
app.use('/api/v1/order',OrderRouter);
app.use('/api/v1/coupon',couponRouter);


// middleware error
app.use(notFound);
app.use(globalerrorhandler);
export default app;
