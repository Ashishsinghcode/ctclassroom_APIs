const jwt= require('jsonwebtoken')
const adminprivatekey= "admin@123"


module.exports =(req,res,next)=>{
   
    const token = req.headers['authorization'];
    
    if(token)
    {
        
       a= jwt.verify(token,adminprivatekey,function(err,token){
        if(err){
            res.json({
                'status':401,
                'success': false,
                'msg':'Unauthorize User'
    
            })    
        }else{
            next()
        }
       }) 
    
    }else{
        res.json({
            'status':401,
            'success': false,
            'msg':'Unauthorize User'

        }) 
    }
}