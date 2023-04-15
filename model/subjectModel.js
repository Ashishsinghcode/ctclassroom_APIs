const mongo = require('mongoose')

const subjectSchema = mongo.Schema({
    'department_id':{type:mongo.Schema.Types.ObjectId, ref:'department', default:''},
    'course_id':{type:mongo.Schema.Types.ObjectId, ref:'course', default:''},
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semester', default:''},
    'teacher_id':{type:mongo.Schema.Types.ObjectId, ref:'teacher', default:''},
    'subject_id':{type:String, default:''},
    'subject_name':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:'Unblocked'},
    
})

module.exports= mongo.model('subject',subjectSchema)