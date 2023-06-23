const otpgenerator=require('otp-generator');
const fast2sms = require('fast-two-sms');
const Otp = require('../model/otpModel');
const request =require('request')

function generate_otp(req,res){
    console.log(req.body)
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
            res.json({
                'status':200,
                'success':true,
                'otp':OTP,
                'number':req.body.number
            })
        }
    }
    
function send_otp(req,res){
         request({
             uri: 'https://www.fast2sms.com/dev/bulkV2',
             qs: {
               authorization: 'R7m7Aze8in3xoaaLfSBgcFqvoDdVI7trVsR5pToD7UXCIDXyuNshtdOLBfRV',
               query: 'World of Warcraft: Legion',
               numbers:req.body.numbers,
               route:'otp',
               variables_values:req.body.otp
             },
             //body:JSON.stringify({numbers:'7250888739'})
     }).pipe(res)
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
    generate_otp,
    send_otp,
    verify_otp
}