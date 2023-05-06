const Semester = require('../model/semesterModel')
const Test = require('../model/testModel')


function add_test(req,res){
  
    let validators =''
   
    if(req.body == null || req.body.semester_id == undefined || req.body.semester_id == ''){
        validators += 'Semester_id required'
    }
    
    if(req.body == null || req.body.title == undefined || req.body.title == ''){
        validators += 'Title required'
    }
    if(req.body == null || req.body.link == undefined || req.body.link == ''){
        validators += 'Link required'
    }
    if(req.body == null || req.body.marks == undefined || req.body.marks == ''){
        validators += 'marks required'
    }
    if(req.body == null || req.body.date == undefined || req.body.date == ''){
        validators += 'Date required'
    }
    if(req.body == null || req.body.duration == undefined || req.body.duration == ''){
        validators += 'Test duration required'
    }
    
    if(!!validators){
        res.json({
            'status':422,
            'success':false,
            'message':validators
        })
    }else{
       
                Semester.findOne({'_id':req.body.semester_id}).exec()
                .then(semesterdata=>{
                  
                        let testobj = new Test()
                        testobj.semester_id= semesterdata._id
                        testobj.semester_name= semesterdata.semester_name
                        testobj.title= req.body.title.toUpperCase()
                        testobj.description= req.body.description.toUpperCase()
                        testobj.link= req.body.link
                        testobj.full_marks= req.body.marks
                        testobj.date= req.body.date
                        testobj.duration= req.body.duration
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
    Test.find().exec()
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
