const mongo = require('mongoose')

const teacherSchema = mongo.Schema({
    
    'teacher_id':{type:Number, default:''},
    'teacher_name':{type:String, default:''},
    'email':{type:String, default:''},
    'qualification':{type:String, default:''},
    'contact':{type:String, default:0},
    'password':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    
})

module.exports= mongo.model('teacher',teacherSchema)