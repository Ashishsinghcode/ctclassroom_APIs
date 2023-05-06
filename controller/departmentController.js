const Department = require('../model/departmentModel')


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

        Department.findOne({'department_id':req.body.department_id.toUpperCase()}).exec()

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
                // res.json({
                // 'status':500,
                // 'success':false,
                // 'msg':String(err),
                // })
            
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
        // res.json({
        //     'status':500,
        //     'success':false,
        //     'msg':String(err)
        // })
    })
}
function delete_department(req,res){

    //console.log(req)
    //console.log(req)
    if(req.body == null || req.body._id == undefined || req.body._id == ''){
        res.json({
            'status':200,
            'success':false,
            'msg':'Please Enter ID'
        })
    }else{
        
        Department.findOne({'_id':req.body._id}).exec()
        .then(dep_data=>{
            if(dep_data == null){
                res.json({
                    'status':200,
                    'success':false,
                    'msg':'Department not exists'
                })
                
            }else{
                if(dep_data.is_blocked == "Unblocked")
                {
                    dep_data.is_blocked = "Blocked"
                    dep_data.save()
                    res.json({
                        'status':200,
                        'success':true,
                        'msg':'Department Blocked Successfully',
                        'message':'Blocked'
                    })
                }else{
                    dep_data.is_blocked = "Unblocked"
                    dep_data.save()
                    res.json({
                        'status':200,
                        'success':true,
                        'msg':'Department Retrived Successfully',
                        'message':'Retrived'
                    })
                }
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