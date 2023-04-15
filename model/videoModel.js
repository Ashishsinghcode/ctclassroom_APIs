const mongo = require('mongoose')

const videoSchema = mongo.Schema({
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semester', default:''},
    'title':{type:String, default:''},
    'description':{type:String, default:''},
    'link':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:'Unblocked'},
    
})

module.exports= mongo.model('video',videoSchema)