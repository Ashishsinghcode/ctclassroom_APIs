const mongo = require('mongoose')

const courseSchema = mongo.Schema({
    'department_id':{type:mongo.Schema.Types.ObjectId, ref:'department', default:''},
    'course_id':{type:String, default:''},
    'course_name':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:'Unblocked'},
    
})

module.exports= mongo.model('course',courseSchema)