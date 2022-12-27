const mongo = require('mongoose')

const lectureSchema = mongo.Schema({
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semester', default:''},
    'teacher_id':{type:mongo.Schema.Types.ObjectId, ref:'teacher', default:''},
    'title':{type:Number, default:1},
    'description':{type:String, default:''},
    'link':{type:String, default:''},
    'date':{type:String, default:''},
    'time':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    
})

module.exports= mongo.model('lecture',lectureSchema)