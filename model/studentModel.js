const mongo = require('mongoose')

const studentSchema = mongo.Schema({
    'user_id':{type:mongo.Schema.Types.ObjectId, ref:'user', default:''},
    'department_id':{type:mongo.Schema.Types.ObjectId, ref:'department', default:''},
    'course_id':{type:mongo.Schema.Types.ObjectId, ref:'course', default:''},
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semester', default:''},
    'rollno':{type:Number, default:0},
    'student_name':{type:String, default:''},
    'email':{type:String, default:''},
    'password':{type:String, default:''},
    'contact':{type:Number, default:0},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:'UNBLOCKED'},
    
})

module.exports= mongo.model('student',studentSchema)