const Notice = require('../model/noticeModel')


function add_notice(req,res){
    let validators=''
    if(req.body == null || req.body.title == undefined || req.body.title == '' ){
       validators += 'Title required'
        
    }
    if(req.body == null || req.body.description == undefined || req.body.description == '' ){
       validators += 'Description required'
        
    }
    if(!!validators){
        res.json({
            'status':500,
            'success':false,
            'message':validators
        })
    }
    else {
        console.log(req)
                let noticeobj = new Notice()
                noticeobj.title=req.body.title.toUpperCase()
                noticeobj.description=req.body.description.toUpperCase()
                if(req.file){
                    noticeobj.notice=req.file.filename 
                }
                noticeobj.save()
                
                    res.json({
                        'status':200,
                        'success':true,
                        'message':'Notice Added Successfully'
                    })
    }
}


function get_notice(req,res){
    Notice.find().exec()
    .then(noticedata=>{
        if(noticedata == null){
            res.json({
                'status':200,
                'success':false,
                'Message':'Notice not exists'
            })    
        }else{
            res.json({
                'status':200,
                'success':false,
                'message':'Notice loaded',
                'data':noticedata
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
function delete_notice(req,res){

    //console.log(req)
    //console.log(req)
    if(req.body == null || req.body._id == undefined || req.body._id == ''){
        res.json({
            'status':200,
            'success':false,
            'message':'Please Enter ID'
        })
    }else{
        
        Notice.findOne({'_id':req.body._id}).exec()
        .then(noticedata=>{
            if(noticedata == null){
                res.json({
                    'status':200,
                    'success':false,
                    'message':'Notice not exists'
                })
                
            }else{
                Notice.deleteOne({'_id':req.body._id}).exec()
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Notice Deleted Successfully'
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
    add_notice,
    get_notice,
    delete_notice
}