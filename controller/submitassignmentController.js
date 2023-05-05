const Student =require('../model/studentModel')
const Assignment =require('../model/assignmentModel')
const SubmitAssignment =require('../model/assisubmitModel')

function submit_assignment(req,res){
    let validators =''
    if(req.body == null || req.body.student_id == undefined || req.body.student_id == ''){
        validators += 'student_id required'
    }
    if(req.body == null || req.body.assignment_id == undefined || req.body.assignment_id == ''){
        validators += 'assignment_id required'
    }
    if(req.file == null || req.file.filename == undefined || req.file.filename == ''){
        validators += 'assignment required'
    }
    if(!!validators){
        res.json({
            'status':200,
            'success':false,
            'msg':validators
        })
    }
    else
    {
        SubmitAssignment.findOne({$and:[{'assignment_id':req.body.assignment_id},{'student_id':req.body.student_id}]}).exec()
        .then(submitdata=>{
            if(submitdata){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':"Assignment Already submitted"
                })
            }
            else{

                
                Assignment.findOne({_id:req.body.assignment_id}).exec()
                .then(assignmentdata=>{
                    Student.findOne({_id:req.body.student_id}).exec()
                    .then(studentdata=>{
                        let submitobj = new SubmitAssignment()
                        submitobj.student_id=studentdata._id
                        submitobj.assignment_id=assignmentdata._id
                        if(req.file){
                            submitobj.assignment=req.file.filename 
                        }
                        submitobj.save()
                        res.json({
                            'status':200,
                            'success':true,
                            'msg':"Assignment Submitted Successfully"
                        })
                    })
                    .catch((err)=>{
                        res.json({
                            'status':500,
                            'success':false,
                            'msg':String(err)
                        })
                    })
                })
                .catch((err)=>{
                    res.json({
                        'status':500,
                        'success':false,
                        'msg':String(err)
                    })
                })
            }
            })
            .catch((err)=>{
                res.json({
                    'status':500,
                    'success':false,
                    'msg':String(err)
                }) 
            })
}
}

function get_submit_assignment(req,res){
   
        SubmitAssignment.find().populate('student_id').populate('assignment_id').exec()
        .then(submitassignmentdata=>{
            if(submitassignmentdata == null){
                res.json({
                    'status':200,
                    'success':true,
                    'msg':'Assignment not found'
                })
            }else{
                res.json({
                    'status':200,
                    'success':true,
                    'msg':'Assignment found',
                    'data':submitassignmentdata
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

function check_assignments(req,res){
    let validators =''
    if(req.body == null || req.body.assignment_id == undefined || req.body.assignment_id == ''){
        validators += 'assignment_id required'
    }
    
    if(!!validators){
        res.json({
            'status':200,
            'success':false,
            'msg':validators
        })
    }
    else
    {


    SubmitAssignment.findOne({'_id':req.body.assignment_id}).populate('student_id').populate('assignment_id').exec()
    .then(submitassignmentdata=>{
        if(submitassignmentdata == null){
            res.json({
                'status':200,
                'success':false,
                'msg':'Assignment not found'
            })
        }else if(submitassignmentdata.checked == "checked"){
            res.json({
                'status':200,
                'success':false,
                'msg':'Assignment already checked'
            })
        }
            else{
        
            submitassignmentdata.checked="checked"
            submitassignmentdata.student_id=submitassignmentdata.student_id
            submitassignmentdata.assignment_id=submitassignmentdata.assignment_id
            submitassignmentdata.save()


            res.json({
                'status':200,
                'success':true,
                'msg':'Assignment Checked Successfully',
                
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
    submit_assignment,
    get_submit_assignment,
    check_assignments
}