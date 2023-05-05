const jwt= require('jsonwebtoken')
const privatekey= "admin@123"

module.exports= (req,res,next)=>{
    
    const token = req.headers['authorization'];
    
    if(token)
    {
        jwt.verify(token,privatekey,function(err,decode){
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
            'status':403,
            'success': false,
            'msg':'Unauthorize User'

        }) 
    }
}