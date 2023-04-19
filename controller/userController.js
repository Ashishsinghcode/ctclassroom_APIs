const Admin = require('../model/adminModel')
const User = require('../model/userModel')
const Teacher = require('../model/teacherModel')
const Student = require('../model/studentModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt= require('jsonwebtoken');
const userModel = require('../model/userModel');
const privatekey= "admin@123"



function login(req,res){

    Admin.findOne({'email':req.body.email.toUpperCase()}).exec()
    .then(admindata=>{
        if(admindata == null){
            res.json({
                'status':200,
                'success':false,
                'message':'User not found'
            })
        }else{
            
            if(bcrypt.compareSync(req.body.password,admindata.password))
            {
                const payload ={
                    'id':admindata._id,
                    'email':admindata.email,
                    'name':admindata.name,
                    'designation':"admin"
                }
                const token = jwt.sign(payload,privatekey,{expiresIn:60*20})
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Login Successfully',
                    'token':token,
                    'name':admindata.name,
                    'email':admindata.email

                })    
            }else{
                res.json({
                    'status':200,
                    'success':false,
                    'message':'Invalid Login credential'
                })
            }
        }
    })

    .catch(err=>{
        res.json({
            'status':500,
            'success':false,
            'message':String(err)
        })
    })
} 
function teacherLogin(req,res){

    Teacher.findOne({'email':req.body.email.toUpperCase()}).exec()
    .then(teacherdata=>{
      
        if(teacherdata == null){
            res.json({
                'status':200,
                'success':false,
                'message':'User not found'
            })
        }else{
            User.findOne({'email':req.body.email.toUpperCase()}).exec()
            .then(userdata=>{
                

                if(bcrypt.compareSync(req.body.password,userdata.password))
                {
                    const payload ={
                        'id':userdata._id,
                        'email': userdata.email,
                        'name':userdata.name,
                        'designation':"teacher"
                    }
                    const token = jwt.sign(payload,privatekey,{expiresIn:60*20})
                    
                    res.json({
                        'status':200,
                        'success':true,
                        'message':'Login Successfully',
                        'token':token,
                        'name':userdata.name,
                        'email':userdata.email
    
                    })    
                }else{
                    res.json({
                        'status':200,
                        'success':false,
                        'message':'Invalid Login credential'
                    })
                }

            })
            .catch(err=>{
                res.json({
                    'status':500,
                    'success':false,
                    'message':String(err)
                })
            })
            
        }
    })

    .catch(err=>{
        res.json({
            'status':500,
            'success':false,
            'message':String(err)
        })
    })
} 
function studentLogin(req,res){

    Student.findOne({'email':req.body.email.toUpperCase()}).exec()
    .then(studentdata=>{
      
        if(studentdata == null){
            res.json({
                'status':200,
                'success':false,
                'message':'User not found'
            })
        }else{
            User.findOne({'email':req.body.email.toUpperCase()}).exec()
            .then(userdata=>{
                if(bcrypt.compareSync(req.body.password,userdata.password))
                {
                    const payload ={
                        'id':userdata._id,
                        'email': userdata.email,
                        'name':userdata.name,
                        'designation':"student"
                    }
                    const token = jwt.sign(payload,privatekey,{expiresIn:60*20})
                    
                    res.json({
                        'status':200,
                        'success':true,
                        'message':'Login Successfully',
                        'token':token,
                        'name':userdata.name,
                        'email':userdata.email,
                        'semester_id':studentdata.semester_id
                       
    
                    })    
                }else{
                    res.json({
                        'status':200,
                        'success':false,
                        'message':'Invalid Login credential'
                    })
                }

            })
            .catch(err=>{
                res.json({
                    'status':500,
                    'success':false,
                    'message':String(err)
                })
            })
            
        }
    })

    .catch(err=>{
        res.json({
            'status':500,
            'success':false,
            'message':String(err)
        })
    })
} 
module.exports={
    login,
    teacherLogin,
    studentLogin
}