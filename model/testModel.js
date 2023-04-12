const mongo = require('mongoose')

const testSchema = mongo.Schema({
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semester', default:''},
    'semester_name':{type:String, default:''},
    'title':{type:String, default:''},
    'description':{type:String, default:''},
    'link':{type:String, default:''},
    'date':{type:String, default:'profile.jpg'},
    'full_marks':{type:Number, default:0},
    'duration':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},

})

module.exports= mongo.model('test',testSchema)