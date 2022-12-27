const mongo = require('mongoose')

const courseSchema = mongo.Schema({
    'dept_id':{type:mongo.Schema.Types.ObjectId, ref:'department', default:''},
    'course_id':{type:Number, default:''},
    'course_name':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    
})

module.exports= mongo.model('course',courseSchema)