const Notes = require('../model/notesModel')
const Semester = require('../model/semesterModel')

function add_notes(req,res){
    
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
            'message':validators
        })
    }
    else {
            Semester.findOne({'_id':req.body.semester_id}).exec()
            .then(semesterdata=>{
                console.log(semesterdata._id)
                let notesobj = new Notes()
                notesobj.title=req.body.title.toUpperCase()
                notesobj.semester_id= semesterdata._id
                notesobj.description=req.body.description.toUpperCase()
                if(req.file){
                    notesobj.notes=req.file.filename 
                }
                notesobj.save()
                
                    res.json({
                        'status':200,
                        'success':true,
                        'message':'Notes Added Successfully'
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

function get_notes(req,res){
    Notes.find().exec()
    .then(notesdata=>{
        if(notesdata == null){
            res.json({
                'status':200,
                'success':false,
                'message':'notes not exists'
            })    
        }else{
            res.json({
                'status':200,
                'success':false,
                'message':'notes loaded',
                'data':notesdata
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
function delete_notes(req,res){

    //console.log(req)
    //console.log(req)
    if(req.body == null || req.body._id == undefined || req.body._id == ''){
        res.json({
            'status':200,
            'success':false,
            'message':'Please Enter ID'
        })
    }else{
        
        Notes.findOne({'_id':req.body._id}).exec()
        .then(notesdata=>{
            if(notesdata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'message':'notes not exists'
                })
                
            }else{
                Notes.deleteOne({'_id':req.body._id}).exec()
                res.json({
                    'status':200,
                    'success':true,
                    'message':'notes Deleted Successfully'
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
        
    
module.exports={
    add_notes,
    get_notes,
    delete_notes
}