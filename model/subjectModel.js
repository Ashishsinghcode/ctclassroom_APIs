const mongo = require('mongoose')

const subjectSchema = mongo.Schema({
    'dept_id':{type:mongo.Schema.Types.ObjectId, ref:'department', default:''},
    'course_id':{type:mongo.Schema.Types.ObjectId, ref:'course', default:''},
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semeter', default:''},
    'teacher_id':{type:mongo.Schema.Types.ObjectId, ref:'teacher', default:''},
    'subject_id':{type:String, default:''},
    'subject_name':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    
})

module.exports= mongo.model('subject',subjectSchema)