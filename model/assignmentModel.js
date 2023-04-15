const mongo = require('mongoose')

const assignmentSchema = mongo.Schema({
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semester', default:''},
    'title':{type:String, default:1},
    'semester_name':{type:String, default:''},
    'description':{type:String, default:''},
    'assignment':{type:String, default:''},
    'assign_date':{type:String, default:''},
    'submission_date':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:'Unblocked'},
    
})

module.exports= mongo.model('assignment',assignmentSchema)