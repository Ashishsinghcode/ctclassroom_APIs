const jwt= require('jsonwebtoken')
const adminprivatekey= "admin@123"


module.exports =(req,res,next)=>{
   
    const token = req.headers['authorization'];
      
    if(token)
    {
       a= jwt.verify(token,adminprivatekey)
         console.log(a)   
           

            
            next()
       
    }else{
        res.json({
            'status':403,
            'success': false,
            'msg':'Unauthorize User'

        }) 
    }
}