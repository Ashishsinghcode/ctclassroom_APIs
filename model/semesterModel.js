const mongo = require('mongoose')

const semesterSchema = mongo.Schema({
    'dept_id':{type:mongo.Schema.Types.ObjectId, ref:'department', default:''},
    'course_id':{type:mongo.Schema.Types.ObjectId, ref:'course', default:''},
    'semester_id':{type:Number, default:''},
    'semester_name':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    
})

module.exports= mongo.model('semester',semesterSchema)