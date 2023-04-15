const mongo = require('mongoose')

const adminSchema = mongo.Schema({

    'name':{type:String, default:''},
    'email':{type:String, default:''},
    'password':{type:String, default:''},
    'created_at':{type:Date, default:Date.now()},
    'is_blocked':{type:String, default:'Unblocked'},
    
})

module.exports= mongo.model('admin',adminSchema)