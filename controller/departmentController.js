const Department = require('../model/departmentModel')
const { param } = require('../route/adminRoutes')

function add_department(req,res){
    let validators=''
    if(req.body == null || req.body.department_id == undefined || req.body.department_id == '' ){
       validators += 'Department id required'
        
    }
    if(req.body == null || req.body.department_name == undefined || req.body.department_name == '' ){
       validators += 'Department name required'
        
    }
    if(!!validators){
        res.json({
            'status':500,
            'success':false,
            'msg':validators
        })
    }
    else {

        Department.findOne({'department_name':req.body.department_name}).exec()

        .then((data)=>{
            if(data == null){
                let departmentObj = new Department()
                departmentObj.department_id=req.body.department_id.toUpperCase()
                departmentObj.department_name=req.body.department_name.toUpperCase()
                departmentObj.save()
                
                    res.json({
                        'status':200,
                        'success':true,
                        'msg':'Department Added successfully'
                    })
                
               
            }else{
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Department already exists'
                    })
                }

        })
            .catch((err)=>{
                res.json({
                'status':500,
                'success':false,
                'msg':String(err),
                })
            
            })
    }
}


function get_department(req,res){
    Department.find().exec()
    .then(departmentdata=>{
        if(departmentdata == null){
            res.json({
                'status':200,
                'success':false,
                'msg':'Department not exists'
            })    
        }else{
            res.json({
                'status':200,
                'success':false,
                'msg':'Department loaded',
                'data':departmentdata
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
function delete_department(req,res){

    //console.log(req)
    //console.log(req)
    if(req.params == null || req.params._id == undefined || req.body._id == ''){
        res.json({
            'status':200,
            'success':false,
            'msg':'Please Enter ID'
        })
    }else{
        console.log(req.params._id)
        Department.findOne({'_id':req.params._id}).exec()
        .then(dep_data=>{
            if(dep_data == null){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Department not exists'
                })
                
            }else{
                Department.deleteOne({'_id':req.params._id}).exec()
                res.json({
                    'status':200,
                    'success':true,
                    'msg':'Department Deleted Successfully'
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
    add_department,
    get_department,
    delete_department
}