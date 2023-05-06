const User = require('../model/userModel')
const Teacher = require('../model/teacherModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;


function add_teacher(req,res){
    let validators=''
        if(req.body == null || req.body.teacher_id == undefined || req.body.teacher_id == ''){
            validators += 'Teacher Id  reqired '
        }
        if(req.body == null || req.body.teacher_name == undefined || req.body.teacher_name == ''){
            validators += 'Teacher Name  reqired '
        }
        if(req.body == null || req.body.email == undefined || req.body.email == ''){
            validators += 'Email  reqired '
        }
        if(req.body == null || req.body.password == undefined || req.body.password == ''){
            validators += 'Password  reqired '
        }
        if(req.body == null || req.body.contact == undefined || req.body.contact == ''){
            validators += 'Contact  reqired '
        }
        if(req.body == null || req.body.qualification == undefined || req.body.qualification == ''){
            validators += 'Qualification  reqired '
        }
        if(!!validators){
            res.json({
                'status':422,
                'success':false,
                'message':validators
            })
        }else{
            Teacher.findOne({$or:[
                {'email':req.body.email.toUpperCase()},
                {'teacher_id':req.body.teacher_id.toUpperCase()}
            ]}).exec()
            .then(user=>{
                if(user != null){
                    res.json({
                        'status':200,
                        'success':false,
                        'message':'Teacher Already exists'
                    })
                }else{
                    let userObj = new User()
                    userObj.name=req.body.teacher_name.toUpperCase()
                    userObj.email=req.body.email.toUpperCase()
                    userObj.password=bcrypt.hashSync(req.body.password, saltRounds)
                    userObj.save()
                    .then(async userdata=>{
                        var teachercount = await Teacher.countDocuments().exec()
                        let teacherObj = Teacher()
                      
                        teacherObj.teacher_id=req.body.teacher_id.toUpperCase()
                        teacherObj.teacher_name=req.body.teacher_name.toUpperCase()
                        teacherObj.email=req.body.email.toUpperCase()
                        teacherObj.password=req.body.password
                        teacherObj.contact=req.body.contact
                        teacherObj.qualification=req.body.qualification.toUpperCase()
                        teacherObj.user_id=userdata._id
                        teacherObj.save()
                        res.json({
                            'status':200,
                            'success':true,
                            'message':'Teacher registerd successfully'
                        })
                    })
                    .catch(err=>{
                        res.json({
                            'status':500,
                            'success':false,
                            'message':String(err),
                            'data':'error on teacher data'
                        })
                    })
    
                }
            })
            .catch(err=>{
                res.json({
                    'status':500,
                    'success':false,
                    'message':String(err),
                    'data':'error on user data'
                })
            })
        }
    }

    
    function get_teacher(req,res){
        Teacher.find(req.body._id).exec()
        .then(teacherdata=>{
            if(teacherdata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Teachers not exists'
                })    
            }else{
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Teachers loaded',
                    'data':teacherdata
                })
            }
    
        })
        .catch(err=>{
            res.json({
                'status':500,
                'success':false,
                'msg':String(err)
            })
        })
    }
    function get_single_teacher(req,res){
        
        Teacher.findOne({'_id':req.body._id}).exec()
        .then(teacherdata=>{
            
            if(teacherdata == null ){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Teachers not exists'
                })    
            }else{
                
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Teachers loaded',
                    'data':teacherdata
                })
            }
    
        })
        .catch(err=>{
            res.json({
                'status':500,
                'success':false,
                'msg':String(err)
            })
        })
    }
    function update_teacher(req,res){
       
        if(req.body._id == undefined){
            res.json({
                'status':422,
                'success':false,
                'message':'_id is required'
            })
        }else{
            Teacher.findOne({'_id':req.body._id}).exec()
            .then(teacherdata=>{
                //console.log(teacherdata)
                if(teacherdata == null){
                    res.json({
                        'status':200,
                        'success':true,
                        'message':'Teacher not exist'
                    })  
                }else{
                    
                    User.findOne({'_id':teacherdata.user_id}).exec()
                    .then(userdata=>{
                        if(userdata== null){
                            res.json({
                                'status':200,
                                'success':true,
                                'message':'User not exist'
                            }) 
                        }
                        else{
                            // console.log(req.body)
                            userdata.email = req.body.email
                            userdata.save()
                            
                            teacherdata.user_id = teacherdata.user_id                       
                            teacherdata.teacher_name=req.body.teacher_name.toUpperCase(),
                            teacherdata.email=req.body.email.toUpperCase(),
                            teacherdata.contact=req.body.contact,
                            teacherdata.qualification=req.body.qualification.toUpperCase(),
                            teacherdata.is_blocked=req.body.is_blocked
                            teacherdata.save()
                            res.json({
                                'status':200,
                                'success':true,
                                'message':'Teacher Updated'
                            })
                           
                             
                        }
                    })
                    .catch(err=>{
                        res.json({
                            'status':500,
                            'success':false,
                            'message':'erron in user'+String(err)
                        })
                    })
                    
                    
                }
            })
            .catch(err=>{
               
                    res.json({
                        'status':500,
                        'success':false,
                        'message':'error in teacher'+String(err)
                    })
                
            })
        }
    }  
    function get_teacher_by_email(req,res){
      
        let validators=''
        if(req.body == null || req.body.email == undefined || req.body.email == '' ){
           validators += 'Email required'
            
        }
        
        if(!!validators){
            res.json({
                'status':422,
                'success':false,
                'msg':validators
            })
        }
        else{

            Teacher.findOne({'email':req.body.email.toUpperCase()}).exec()
            .then(teacherdata=>{
                
                if(teacherdata == null ){
                    res.json({
                        'status':200,
                        'success':false,
                        'msg':'Teacher not exists'
                    })    
                }else{
                    
                    res.json({
                        'status':200,
                        'success':true,
                        'msg':'',
                        'data':teacherdata
                    })
                }
                
            })
            .catch(err=>{
                res.json({
                    'status':500,
                    'success':false,
                    'msg':String(err)
                })
            })
        }
    }
module.exports={
    add_teacher,
    get_teacher,
    update_teacher,
    get_single_teacher,
    get_teacher_by_email
    
    
}