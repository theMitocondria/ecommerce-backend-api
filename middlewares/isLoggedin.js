import getTokenFromHeader from "../utils/getTokenfromHeader.js"
import verifyToken from "../utils/verifyToken.js";




export const isLoggedIn=(req,res,next)=>{
    // get token from header
    const token = getTokenFromHeader(req);
    //vrify the token
    const decoded= verifyToken(token);
    // save tthe user into req obj
    if(!decoded){
        throw new Error("Invalid token, Pleasse Login first");
    }else{
        req.userAuthId=decoded?.id;
        next();
    }
}