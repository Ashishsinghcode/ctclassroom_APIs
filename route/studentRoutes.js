const route = require('express').Router()
const userController= require('../controller/userController')

//Login
route.post('/studentlogin',userController.studentLogin)

//ERROR PAGE
route.all("**",function(req,res){
    res.json({
        'status':404,
        'success':false,
        'message':'Page not found'
    })
})
//END ERROR PAGE
module.exports = route