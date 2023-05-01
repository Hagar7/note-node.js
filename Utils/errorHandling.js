
let stackVar;

export const asyncHandler = (API)=>{
    return(req,res,next)=>{
        API(req,res,next).catch((err)=>{
               if (err.code == 11000) {
        //  return res.status(409).json({ message: "email is already exist" });
             next(new Error("email is already exist",{cause:409}))
              stackVar = err.stack
             }
            // res.status(500).json({ message:"catch erroe",error:err.message, stack:err.stack });
            stackVar = err.stack
            next(new Error(err.message))
        })

    }
}


export {stackVar}