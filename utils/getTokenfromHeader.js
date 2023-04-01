const getTokenFromHeader= (req)=>{
    const token=req?.headers?.authorization?.split(" ")[1];
    return (token?token:"token not found");
}

export default getTokenFromHeader;