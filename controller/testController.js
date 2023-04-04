const Subject = require('../model/subjectModel')
const Test = require('../model/testModel')


function add_test(req,res){
    let validators =''
   
    if(req.body == null || req.body._id == undefined || req.body._id == ''){
        validators += 'Subject_id required'
    }
    
    if(req.body == null || req.body.title == undefined || req.body.title == ''){
        validators += 'Title required'
    }
    if(req.body == null || req.body.link == undefined || req.body.link == ''){
        validators += 'Link required'
    }
    if(req.body == null || req.body.full_marks == undefined || req.body.full_marks == ''){
        validators += 'Full marks required'
    }
    if(req.body == null || req.body.date == undefined || req.body.date == ''){
        validators += 'Date required'
    }
    if(req.body == null || req.body.start_time == undefined || req.body.start_time == ''){
        validators += 'Start time required'
    }
    if(req.body == null || req.body.end_time == undefined || req.body.end_time == ''){
        validators += 'End time required'
    }
    if(!!validators){
        res.json({
            'status':422,
            'success':false,
            'message':validators
        })
    }else{
       
                Subject.findOne({'_id':req.body._id}).exec()
                .then(subjectdata=>{
                    console.log(subjectdata)
                        let testobj = Test()
                        testobj.semester_id= subjectdata.semester_id
                        testobj.teacher_name= req.body.teacher_name
                        testobj.subject_id= subjectdata._id
                        testobj.title= req.body.title.toUpperCase()
                        testobj.link= req.body.link
                        testobj.full_marks= req.body.full_marks
                        testobj.date= req.body.date
                        testobj.start_time= req.body.start_time
                        testobj.end_time= req.body.end_time
                        testobj.save()
                        res.json({
                            'status':200,
                            'success':true,
                            'message':"Test added successfully"
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
function get_test(req,res){
    Test.find().populate('teacher_id').populate('subject_id').populate('semester_id').exec()
    .then(testdata=>{
        if(testdata == null){
            res.json({
                'status':200,
                'success':false,
                'message':'Test not exists'
            })    
        }else{
           
            res.json({
                'status':200,
                'success':false,
                'message':'Test loaded',
                'data':testdata
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
function delete_test(req,res){

    if(req.body == null || req.body._id == undefined || req.body._id == ''){
        res.json({
            'status':200,
            'success':false,
            'message':'Please Enter ID'
        })
    }else{
        
        Test.findOne({'_id':req.body._id}).exec()
        .then(testdata=>{
            if(testdata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'message':'Test not exists'
                })
                
            }else{
                Test.deleteOne({'_id':req.body._id}).exec()
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Test Deleted Successfully'
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
    add_test,
    get_test,
    delete_test
}
