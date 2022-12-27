const jwt= require('jsonwebtoken')
const privatekey= "Ashish@123"

module.exports= (req,res,next)=>{
    const token = req.headers['authorization'];
    
    if(token)
    {
        jwt.verify(token,privatekey,function(err,decode){
            if(err){
                res.json({
                    'status':403,
                    'success': false,
                    'Message':'Unauthorize User'

                })
            }
            req.decode = decode
            next()
        })
    }else{
        res.json({
            'status':403,
            'success': false,
            'Message':'Unauthorize User'

        }) 
    }
}