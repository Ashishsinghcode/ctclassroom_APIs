const mongo = require('mongoose')

const departmentSchema = mongo.Schema({
    'department_id':{type:String, default:''},
    'department_name':{type:String, default:''},
    'is_blocked':{type:String, default:'Unblocked'},
    'created_at':{type:Date, default:Date.now()},
    
})

module.exports= mongo.model('department',departmentSchema)