const mongo = require('mongoose')

const noticeSchema = mongo.Schema({
    
    'title':{type:String, default:''},
    'description':{type:String, default:''},
    'notice':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:false},
    
})

module.exports= mongo.model('notice',noticeSchema)