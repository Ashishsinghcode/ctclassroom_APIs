const mongo = require('mongoose')

const departmentSchema = mongo.Schema({
    'dept_id':{type:Number, default:''},
    'dept_name':{type:String, default:''},
    'is_blocked':{type:String, default:false},
    'created_at':{type:Date, default:Date.now()},
    
})

module.exports= mongo.model('department',departmentSchema)