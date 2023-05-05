const mongo= require('mongoose')

const otpSchema = mongo.Schema({
    number :{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{type:Date, default:Date.now,index:{expires:300}}
},{ timestamps:true});
module.exports = mongo.model('otp',otpSchema);


    //This will delete the otp after 5 min or 300 second

