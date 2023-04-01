import Jwt from "jsonwebtoken";

const verifyToken=(token)=>{
    return Jwt.verify(token , process.env.JWT_SECRET , (err,decoded)=>{
          if(err){
            return false;
          }else{
            return decoded;
          }
    })
}

export default verifyToken;

