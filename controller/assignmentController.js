const Assignment = require('../model/assignmentModel')
const Semester = require('../model/semesterModel')

function add_assignment(req,res){
    let validators=''
    if(req.body == null || req.body.title == undefined || req.body.title == '' ){
       validators += 'Title required'
        
    }
    if(req.body == null || req.body.description == undefined || req.body.description == '' ){
       validators += 'Description required'
    
    }
    if(req.body == null || req.body.semester_id == undefined || req.body.semester_id == '' ){
       validators += 'Semester required'
    
    }
    if(!!validators){
        res.json({
            'status':422,
            'success':false,
            'msg':validators
        })
    }
    else {
            Semester.findOne({'_id':req.body.semester_id}).exec()
            .then(semesterdata=>{
                console.log(semesterdata._id)
                let assignmentobj = new Assignment()
                assignmentobj.title=req.body.title.toUpperCase()
                assignmentobj.semester_id= semesterdata._id
                assignmentobj.description=req.body.description.toUpperCase()
                if(req.file){
                    assignmentobj.assignment=req.file.filename 
                }
                assignmentobj.save()
                
                    res.json({
                        'status':200,
                        'success':true,
                        'message':'Assignment Added Successfully'
                    })
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

function get_assignment(req,res){
    Assignment.find().exec()
    .then(assignmentdata=>{
        if(assignmentdata == null){
            res.json({
                'status':200,
                'success':false,
                'Message':'Assignment not exists'
            })    
        }else{
            res.json({
                'status':200,
                'success':false,
                'message':'Assignment loaded',
                'data':assignmentdata
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
function delete_assignment(req,res){

    //console.log(req)
    //console.log(req)
    if(req.body == null || req.body._id == undefined || req.body._id == ''){
        res.json({
            'status':200,
            'success':false,
            'msg':'Please Enter ID'
        })
    }else{
        
        Assignment.findOne({'_id':req.body._id}).exec()
        .then(assignmentdata=>{
            if(assignmentdata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Assignment not exists'
                })
                
            }else{
                Assignment.deleteOne({'_id':req.body._id}).exec()
                res.json({
                    'status':200,
                    'success':true,
                    'msg':'Assignment Deleted Successfully'
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
    add_assignment,
    get_assignment,
    delete_assignment
}