import jwt from 'jsonwebtoken'
const isAdmin=(req,res,next)=>{
    try{
        
        const token=req.headers.authorization.split(' ')[1]
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(decoded.role!=='admin'){
            return res.status(401).json({
                status:'error',
                message:"Only admins can access this resource."
            })
        }
       return next()
    }catch(err){
        return res.status(401).json({
            status:'error',
            message:"token required"
        })
    }
}
export default isAdmin