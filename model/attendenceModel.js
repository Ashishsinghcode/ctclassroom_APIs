const mongo = require('mongoose')

const atttendenceSchema = mongo.Schema({
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semester', default:''},
    'teacher_id':{type:mongo.Schema.Types.ObjectId, ref:'teacher', default:''},
    'rollno':{type:Number, default:''},
    'student_name':{type:String, default:''},
    'attendence':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    
})

module.exports= mongo.model('attendence',atttendenceSchema)