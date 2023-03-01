const User = require('../model/userModel')
const Student = require('../model/studentModel')
const Semester = require('../model/semesterModel')
const Department = require('../model/departmentModel')
const Course = require('../model/courseModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;


function get_student_list(req,res){
    if(req.body == null || req.body.semester_id == null || req.body.semester_id == ''){
        res.json({
            'status' : 422,
            'success': false,
            'message': 'Semester Id required'
        })
    }
    else{
        var mysort ={rollno:1}
        Student.find({'semester_id':req.body.semester_id}).sort(mysort).exec()
        .then(studentdata =>{
            if(studentdata == null){
                res.json({
                    'status' : 200,
                    'success': true,
                    'message': 'Student not found'
                })
            }else{
                res.json({
                    'status' : 200,
                    'success': true,
                    'message': 'Student Loaded',
                    'data': studentdata
                })
            }
        }

        )
        .catch(err=>{
            res.json({
                'status' : 500,
                'success': false,
                'message': String(err)
            })
        }

        )
    }
}
module.exports ={
    get_student_list
}