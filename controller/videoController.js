const Semester = require('../model/semesterModel')
const Video = require('../model/videoModel')


function add_video(req,res){
    let validators =''
   
    
    if(req.body == null || req.body.semester_id == undefined || req.body.semester_id == ''){
        validators += 'Semester Id required'
    }
    if(req.body == null || req.body.title == undefined || req.body.title == ''){
        validators += 'Title required'
    }
    if(req.body == null || req.body.link == undefined || req.body.link == ''){
        validators += 'Link required'
    }
    if(req.body == null || req.body.description == undefined || req.body.description == ''){
        validators += 'Description required'
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
                        let videoobj =new Video()
                        videoobj.semester_id= semesterdata._id
                        videoobj.title= req.body.title.toUpperCase()
                        videoobj.description= req.body.description.toUpperCase()
                        videoobj.link= req.body.link
                        videoobj.save()
                        res.json({
                            'status':200,
                            'success':true,
                            'message':"Video added successfully"
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
function get_video(req,res){
    Video.find().populate('semester_id').exec()
    .then(videodata=>{
        if(videodata == null){
            res.json({
                'status':200,
                'success':false,
                'message':'video not exists'
            })    
        }else{
           
            res.json({
                'status':200,
                'success':false,
                'message':'video loaded',
                'data':videodata
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
function delete_video(req,res){

    if(req.body == null || req.body._id == undefined || req.body._id == ''){
        res.json({
            'status':200,
            'success':false,
            'message':'Please Enter ID'
        })
    }else{
        
        Video.findOne({'_id':req.body._id}).exec()
        .then(videodata=>{
            if(videodata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'message':'video not exists'
                })
                
            }else{
                Video.deleteOne({'_id':req.body._id}).exec()
                res.json({
                    'status':200,
                    'success':true,
                    'message':'video Deleted Successfully'
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
    add_video,
    get_video,
    delete_video
}
