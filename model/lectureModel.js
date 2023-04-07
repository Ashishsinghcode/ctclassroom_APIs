const mongo = require('mongoose')

const lectureSchema = mongo.Schema({
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semester', default:''},
    'subject_id':{type:mongo.Schema.Types.ObjectId, ref:'subject', default:''},
    'teacher_name':{type:String, default:''},
    'title':{type:String, default:1},
    'link':{type:String, default:''},
    'date':{type:String, default:''},
    'time':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    createdAt:{type:Date, default:Date.now,index:{expires:20}}
})

module.exports= mongo.model('lecture',lectureSchema)