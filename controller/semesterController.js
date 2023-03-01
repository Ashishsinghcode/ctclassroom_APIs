const Semester = require('../model/semesterModel')
const Department = require('../model/departmentModel')
const Course = require('../model/courseModel')
function add_semester(req,res){
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
    if(req.body == null || req.body.semester_name == undefined || req.body.semester_name == ''){
        validators += 'Semester_name required'
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
                Course.findOne({'_id':req.body.course_id}).exec()
                .then(coursedata=>{
                    Semester.findOne({'semester_id':req.body.semester_id.toUpperCase()}).exec()
                    .then(semesterdata=>{
                        
                    if(semesterdata == null){
                        let semesterobj = Semester()
                        semesterobj.department_id = departmentdata._id
                        semesterobj.course_id= coursedata._id
                        semesterobj.semester_id= req.body.semester_id.toUpperCase()
                        semesterobj.semester_name= req.body.semester_name.toUpperCase()
                        semesterobj.save()
                        res.json({
                            'status':200,
                            'success':true,
                            'msg':"Semester added successfully"
                    })
                    }else{
                        res.json({
                            'status':200,
                            'success':false,
                            'msg':"Semester already exists"
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
        
        })
    .catch(err=>{
        res.json({
            'status':500,
            'success':false,
            'msg':String(err)
        })
    })
})
}
}
function get_semester(req,res){
    var mysort ={ semester_name : 1}
    Semester.find().populate('department_id').populate('course_id').sort(mysort).exec()
    .then(semesterdata=>{
        if(semesterdata == null){
            res.json({
                'status':200,
                'success':false,
                'msg':'Semester not exists'
            })    
        }else{
           
            res.json({
                'status':200,
                'success':false,
                'msg':'Semester loaded',
                'data':semesterdata
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
function delete_semester(req,res){

    //console.log(req)
    //console.log(req)
    if(req.body == null || req.body._id == undefined || req.body._id == ''){
        res.json({
            'status':200,
            'success':false,
            'msg':'Please Enter ID'
        })
    }else{
        
        Semester.findOne({'_id':req.body._id}).exec()
        .then(semesterdata=>{
            if(semesterdata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Semester not exists'
                })
                
            }else{
                Semester.deleteOne({'_id':req.body._id}).exec()
                res.json({
                    'status':200,
                    'success':true,
                    'msg':'Semester Deleted Successfully'
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

module.exports= {
    add_semester,
    get_semester,
    delete_semester
}
