const mongo = require('mongoose')

const assignmentSchema = mongo.Schema({
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semester', default:''},
    'title':{type:Number, default:1},
    'description':{type:String, default:''},
    'assignment':{type:String, default:''},
    'assign_date':{type:String, default:''},
    'submit_date':{type:String, default:'profile.jpg'},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    
})

module.exports= mongo.model('assignment',assignmentSchema)