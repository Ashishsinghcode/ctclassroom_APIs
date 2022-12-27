const mongo = require('mongoose')

const videoSchema = mongo.Schema({
    'semester_id':{type:mongo.Schema.Types.ObjectId, ref:'semester', default:''},
    'title':{type:Number, default:''},
    'description':{type:String, default:''},
    'video':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    
})

module.exports= mongo.model('video',videoSchema)