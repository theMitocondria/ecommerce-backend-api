import User from "../model/User.js"

const isAdmin=async (req,res,next)=>{
    // find the user
    const user=await User.findById(req.userAuthId);
    // check if admin
    if(user.isAdmin){
        next();
    }else{
        next(new Error("access denied admin only"));
    }
}

export default isAdmin;