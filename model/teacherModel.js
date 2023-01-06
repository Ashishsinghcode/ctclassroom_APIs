const mongo = require('mongoose')

const teacherSchema = mongo.Schema({
    'user_id':{type:mongo.Schema.Types.ObjectId, ref:'user', default:''},
    'teacher_id':{type:String, default:''},
    'teacher_name':{type:String, default:''},
    'email':{type:String, default:''},
    'qualification':{type:String, default:''},
    'contact':{type:Number, default:0},
    'password':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:'UNBLOCKED'},
    
})

module.exports= mongo.model('teacher',teacherSchema)