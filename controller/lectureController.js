const Subject = require('../model/subjectModel')
const Lecture = require('../model/lectureModel')


function add_lecture(req,res){
    let validators =''
   
    
    if(req.body == null || req.body.subject_id == undefined || req.body.subject_id == ''){
        validators += 'Subject Id required'
    }
    
    if(req.body == null || req.body.title == undefined || req.body.title == ''){
        validators += 'Title required'
    }
    if(req.body == null || req.body.link == undefined || req.body.link == ''){
        validators += 'Link required'
    }
    if(req.body == null || req.body.date == undefined || req.body.date == ''){
        validators += 'Date required'
    }
    if(req.body == null || req.body.time == undefined || req.body.time == ''){
        validators += 'Time required'
    }
    if(!!validators){
        res.json({
            'status':422,
            'success':false,
            'message':validators
        })
    }else{
       
                Subject.findOne({'_id':req.body.subject_id}).exec()
                .then(subjectdata=>{
                   
                        let lectureobj = Lecture()
                        lectureobj.semester_id= subjectdata.semester_id
                        lectureobj.teacher_id= subjectdata.teacher_id
                        lectureobj.subject_id= req.body._id
                        lectureobj.title= req.body.title.toUpperCase()
                        lectureobj.link= req.body.link
                        lectureobj.date= req.body.date
                        lectureobj.time= req.body.time
                        lectureobj.save()
                        res.json({
                            'status':200,
                            'success':true,
                            'message':"Class added successfully"
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
function get_lecture(req,res){
    Lecture.find().populate('semester_id').populate('teacher_id').populate('subject_id').exec()
    .then(lecturedata=>{
        if(lecturedata == null){
            res.json({
                'status':200,
                'success':false,
                'message':'Lecture not exists'
            })    
        }else{
           
            res.json({
                'status':200,
                'success':false,
                'message':'Lecture loaded',
                'data':lecturedata
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
function delete_lecture(req,res){

    if(req.body == null || req.body._id == undefined || req.body._id == ''){
        res.json({
            'status':200,
            'success':false,
            'message':'Please Enter ID'
        })
    }else{
        
        Lecture.findOne({'_id':req.body._id}).exec()
        .then(lecturedata=>{
            if(lecturedata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'message':'Lecture not exists'
                })
                
            }else{
                Lecture.deleteOne({'_id':req.body._id}).exec()
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Lecture Deleted Successfully'
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
    add_lecture,
    get_lecture,
    delete_lecture
}
