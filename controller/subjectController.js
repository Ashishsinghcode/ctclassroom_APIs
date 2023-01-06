const Semester = require('../model/semesterModel')
const Department = require('../model/departmentModel')
const Course = require('../model/courseModel')
const Teacher = require('../model/teacherModel')
const Subject = require('../model/subjectModel')


function add_subject(req,res){
    let validators =''
    if(req.body == null || req.body.department_id == undefined || req.body.department_id == ''){
        validators += 'Department_id required'
    }
    if(req.body == null || req.body.course_id == undefined || req.body.course_id == ''){
        validators += 'Course_id required'
    }
    if(req.body == null || req.body.semester_id == undefined || req.body.semester_id == ''){
        validators += 'Semester_id required'
    }
    if(req.body == null || req.body.teacher_id == undefined || req.body.teacher_id == ''){
        validators += 'Teacher_id required'
    }
    if(req.body == null || req.body.subject_id == undefined || req.body.subject_id == ''){
        validators += 'Subject_id required'
    }
    if(req.body == null || req.body.subject_name == undefined || req.body.semester_name == ''){
        validators += 'Subject_name required'
    }
    if(!!validators){
        res.json({
            'status':200,
            'success':false,
            'message':validators
        })
    }else{

        
            Department.findOne({'_id':req.body.department_id}).exec()
            .then(departmentdata=>{
                Course.findOne({'_id':req.body.course_id}).exec()
                .then(coursedata=>{
                    Semester.findOne({'_id':req.body.semester_id}).exec()
                    .then(semesterdata=>{
                        Teacher.findOne({'_id':req.body.teacher_id}).exec()
                        .then(teacherdata=>{
                            Subject.findOne({'subject_id':req.body.subject_id.toUpperCase()}).exec()
                            .then(subjectdata=>{

                                if(subjectdata == null){
                                    let subjectobj = Subject()
                                    subjectobj.department_id = departmentdata._id
                                    subjectobj.course_id= coursedata._id
                                    subjectobj.semester_id= semesterdata._id
                                    subjectobj.teacher_id= teacherdata._id
                                    subjectobj.subject_id= req.body.subject_id.toUpperCase()
                                    subjectobj.subject_name= req.body.subject_name.toUpperCase()
                                    subjectobj.save()
                                    res.json({
                                        'status':200,
                                        'success':true,
                                        'message':"Subject added successfully"
                                })
                                }else{
                                    res.json({
                                        'status':200,
                                        'success':false,
                                        'message':"Subject already exists"
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
    
                        })
                        .catch(err=>{
                            res.json({
                                'status':500,
                                'success':false,
                                'message':String(err)
                            })
                        })

        
                    })
                    .catch(err=>{
                        res.json({
                            'status':500,
                            'success':false,
                            'message':String(err)
                        })
                    })
                })
                .catch(err=>{
                    res.json({
                        'status':500,
                        'success':false,
                        'message':String(err)
                    })
                })

            })
            .catch(err=>{
                res.json({
                    'status':500,
                    'success':false,
                    'message':String(err)
            })
        })

        }
    }
function get_subject(req,res){
    Subject.find().populate('department_id').populate('course_id').populate('semester_id').populate('teacher_id').exec()
    .then(subjectdata=>{
        if(subjectdata == null){
            res.json({
                'status':200,
                'success':false,
                'message':'Subject not exists'
            })    
        }else{
           
            res.json({
                'status':200,
                'success':false,
                'message':'Subject loaded',
                'data':subjectdata
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
function delete_subject(req,res){
console.log('hello')
    if(req.params == null || req.params._id == undefined || req.params._id == ''){
        res.json({
            'status':200,
            'success':false,
            'message':'Please Enter ID'
        })
    }else{
        
        Subject.findOne({'_id':req.params._id}).exec()
        .then(subjectdata=>{
            if(subjectdata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'message':'Subject not exists'
                })
                
            }else{
                Subject.deleteOne({'_id':req.params._id}).exec()
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Subject Deleted Successfully'
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
}

module.exports= {
    add_subject,
    get_subject,
    delete_subject
}
