const Course = require('../model/courseModel')
const Department = require('../model/departmentModel')

function add_course(req,res){
    let validators =''
    if(req.body == null || req.body.department_id == undefined || req.body.department_id == ''){
        validators += 'Department_id required'
    }
    if(req.body == null || req.body.course_id == undefined || req.body.course_id == ''){
        validators += 'Course_id required'
    }
    if(req.body == null || req.body.course_name == undefined || req.body.course_name == ''){
        validators += 'Course_name required'
    }
    if(!!validators){
        res.json({
            'status':200,
            'success':false,
            'msg':validators
        })
    }else{

        
        Department.findOne({'_id':req.body.department_id}).exec()
        .then(departmentdata=>{
            console.log(departmentdata)
            if(departmentdata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':"Department not found"
                })
            }else{
                Course.findOne({'course_name':req.body.course_name}).exec()
                .then(coursedata=>{
                    if(coursedata == null){
                        let courseobj = Course()
                        courseobj.department_id = departmentdata._id
                        courseobj.course_id= req.body.course_id.toUpperCase()
                        courseobj.course_name= req.body.course_name.toUpperCase()
                        courseobj.save()
                        res.json({
                            'status':200,
                        'success':true,
                        'msg':"Course added successfully"
                    })
                }else{
                    res.json({
                        'status':200,
                        'success':false,
                        'msg':"Course already exists"
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
function get_course(req,res){
    Course.find().exec()
    .then(coursedata=>{
        if(coursedata == null){
            res.json({
                'status':200,
                'success':false,
                'msg':'Course not exists'
            })    
        }else{
            res.json({
                'status':200,
                'success':false,
                'msg':'Course loaded',
                'data':coursedata
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
function delete_course(req,res){

    //console.log(req)
    //console.log(req)
    if(req.params == null || req.params._id == undefined || req.body._id == ''){
        res.json({
            'status':200,
            'success':false,
            'msg':'Please Enter ID'
        })
    }else{
        console.log(req.params._id)
        Course.findOne({'_id':req.params._id}).exec()
        .then(coursedata=>{
            if(coursedata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Course not exists'
                })
                
            }else{
                Course.deleteOne({'_id':req.params._id}).exec()
                res.json({
                    'status':200,
                    'success':true,
                    'msg':'Course Deleted Successfully'
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
    add_course,
    get_course,
    delete_course
}