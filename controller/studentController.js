const User = require('../model/userModel')
const Student = require('../model/studentModel')
const Semester = require('../model/semesterModel')
const Department = require('../model/departmentModel')
const Course = require('../model/courseModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;


function add_student(req,res){
    let validators=''
        if(req.body == null || req.body.rollno == undefined || req.body.rollno == ''){
            validators += 'Roll no. reqired '
        }
        if(req.body == null || req.body.student_name == undefined || req.body.student_name == ''){
            validators += 'Student Name reqired '
        }
        if(req.body == null || req.body.email == undefined || req.body.email == ''){
            validators += 'Email reqired '
        }
        if(req.body == null || req.body.password == undefined || req.body.password == ''){
            validators += 'Password reqired '
        }
        if(req.body == null || req.body.contact == undefined || req.body.contact == ''){
            validators += 'Contact reqired '
        }
        if(req.body == null || req.body.department_id == undefined || req.body.department_id == ''){
            validators += 'Department Id reqired '
        }
        if(req.body == null || req.body.course_id == undefined || req.body.course_id == ''){
            validators += 'Course Id reqired '
        }
        if(req.body == null || req.body.semester_id == undefined || req.body.semester_id == ''){
            validators += 'Semester Id reqired '
        }
        if(!!validators){
            res.json({
                'status':422,
                'success':false,
                'message':validators
            })
        }else{
            Student.findOne({$or:[
                {'email':req.body.email.toUpperCase()},
                {'rollno':req.body.rollno}
            ]}).exec()
            .then(studentdata=>{
                if(studentdata != null){
                    res.json({
                        'status':200,
                        'success':false,
                        'message':'Student Already exists'
                    })
                }else{
                    Department.findOne({'_id':req.body.department_id}).exec()
                    .then(departmentdata=>{
                        
                        Course.findOne({'_id':req.body.course_id}).exec()
                        .then(coursedata=>{
                            Semester.findOne({'_id':req.body.semester_id}).exec()
                            .then(semesterdata=>{
                                
                    let userObj = new User()
                    userObj.name=req.body.student_name.toUpperCase()
                    userObj.email=req.body.email.toUpperCase()
                    userObj.password=bcrypt.hashSync(req.body.password, saltRounds)
                    userObj.save()
                    .then(async userdata=>{
                        var teachercount = await Student.countDocuments().exec()
                        let studentobj = Student()
                        
                        studentobj.rollno=req.body.rollno
                        studentobj.student_name=req.body.student_name.toUpperCase()
                        studentobj.email=req.body.email.toUpperCase()
                        studentobj.password=req.body.password
                        studentobj.contact=req.body.contact
                        studentobj.department_id=departmentdata._id
                        studentobj.semester_id=semesterdata._id
                        studentobj.course_id=coursedata._id
                        studentobj.user_id=userdata._id
                        studentobj.save()
                        res.json({
                            'status':200,
                            'success':true,
                            'message':'Student registerd successfully'
                        })
                    })
                    .catch(err=>{
                        res.json({
                            'status':500,
                            'success':false,
                            'message':String(err),
                            'data':'error on student data'
                        })
                    })




                                
                            })
                            .catch(err=>{
                                res.json({
                                    'status':500,
                                    'success':false,
                                    'message':String(err),
                                    'data':'error on student data'
                                })
                            })
                        })
                        .catch(err=>{
                            res.json({
                                'status':500,
                                'success':false,
                                'message':String(err),
                                'data':'error on student data'
                            })
                        })
                    })
                    .catch(err=>{
                        res.json({
                            'status':500,
                            'success':false,
                            'message':String(err),
                            'data':'error on student data'
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

    
    function get_student(req,res){
        Student.find(req.body._id).populate('department_id').populate('course_id').populate('semester_id').exec()
        .then(studentdata=>{
            if(studentdata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Student not exists'
                })    
            }else{
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Student loaded',
                    'data':studentdata
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
    function get_single_student(req,res){
        
        Student.findOne({'_id':req.body._id}).exec()
        .then(studentdata=>{
            
            if(studentdata == null ){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Student not exists'
                })    
            }else{
                
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Student loaded',
                    'data':studentdata
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
    function update_student(req,res){
        
        if(req.body._id == undefined){
            res.json({
                'status':422,
                'success':false,
                'message':'_id is required'
            })
        }else{
            Student.findOne({'_id':req.body._id}).exec()
            .then(studentdata=>{
                
                    User.findOne({'_id':studentdata.user_id}).exec()
                    .then(userdata=>{
                        
                        if(userdata== null){
                            res.json({
                                'status':200,
                                'success':true,
                                'message':'Student not exist'
                            }) 
                        }
                        else{
                            // s.log(req.body)
                            userdata.email = req.body.email
                            userdata.save()
                            
                            studentdata.user_id = studentdata.user_id                       
                            studentdata.student_name=req.body.student_name.toUpperCase(),
                            studentdata.email=req.body.email.toUpperCase(),
                            studentdata.contact=req.body.contact,
                            studentdata.semester_id=req.body.semester_id,
                            studentdata.department_id=req.body.department_id,
                            studentdata.semester_id=req.body.semester_id,
                            studentdata.course_id=req.body.course_id,
                            studentdata.is_blocked=req.body.is_blocked.toUpperCase()
                            studentdata.save()
                            res.json({
                                'status':200,
                                'success':true,
                                'message':'Student Updated'
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
module.exports={
    add_student,
    get_student,
    update_student,
    get_single_student
    
    
}