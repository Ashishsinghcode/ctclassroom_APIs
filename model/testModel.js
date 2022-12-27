const mongo = require('mongoose')

const testSchema = mongo.Schema({
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semster', default:''},
    'teacher_id':{type:mongo.Schema.Types.ObjectId, ref:'teacher', default:''},
    'title':{type:Number, default:1},
    'description':{type:String, default:''},
    'test_id':{type:String, default:''},
    'link':{type:String, default:''},
    'date':{type:String, default:'profile.jpg'},
    'full_marks':{type:String, default:''},
    'obtain_marks':{type:String, default:''},
    'from':{type:Number, default:''},
    'to':{type:Number, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    
})

module.exports= mongo.model('test',testSchema)