const mongo = require('mongoose')

const assignmentSchema = mongo.Schema({
    'student_id':{type:mongo.Schema.Types.ObjectId,ref:'student',default:''},
    'assignment_id':{type:mongo.Schema.Types.ObjectId,ref:'assignment',default:''},
    'assignment':{type:String, default:''},
    'checked':{type:String, default:'unchecked'},
    'status':{type:String, default:'submitted'},
    'submited_date':{type:String, default:Date.now()},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:'Unblocked'},
    
})

module.exports= mongo.model('submit_assignment',assignmentSchema)