export const globalerrorhandler=async(err,req,res,next)=>{
    const stack=err?.stack;
    const code=err?.statusCode?err?.statusCode:500;
    const message=err?.message;

    res.status(code).json({
        stack,
        message
    })
}


export const notFound=async(req,res,next)=>{
    const err=new Error(`${req.originalUrl} not found`);
    // calling next middleware
    next(err);
}