const otpgenerator=require('otp-generator');
const fast2sms = require('fast-two-sms')
const Otp = require('../model/otpModel');

function send_otp(req,res){
    let validators=''
    if(req.body == null || req.body.number == undefined || req.body.number == '' ){
       validators += 'number required'
        
    }
    
    if(!!validators){
        res.json({
            'status':422,
            'success':false,
            'msg':validators
        })
    }
    else {
        const OTP =otpgenerator.generate(6,{ upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false });
            const number = req.body.number;
           
            // const salt = bcrypt.genSalt(10)
            // const enotp = bcrypt.hash(number,salt);
            let otpobj = new Otp()
            otpobj.number=req.body.number;
            otpobj.otp=OTP
            otpobj.save()
            var options = {
                authorization :"R7m7Aze8in3xoaaLfSBgcFqvoDdVI7trVsR5pToD7UXCIDXyuNshtdOLBfRV",
                message: `Dear User your Login OTP is :${OTP}`,
                numbers:[req.body.number]
            };
            fast2sms.sendMessage(options)
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
            res.json({
                'status':200,
                'success':true,
                'msg':"Otp sent successfully!"
            })
        }
    }
function verify_otp(req,res){
    Otp.findOne({$and:[{'number':req.body.number},{'otp':req.body.otp}]})
    .then((result)=>{
        if(result){
            res.json({
                'status':200,
                'success':true,
                'msg':"Verified"
            })
        }
        else{
            res.json({
                'status':200,
                'success':false,
                'msg':"Invalid OTP"
            })
        }
    })
    .catch((err)=>{
        res.json({
            'status':500,
            'success':false,
            'msg':String(err)
        })
    })
}

   

module.exports={
    send_otp,
    verify_otp
}