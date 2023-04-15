const Admin = require('../model/adminModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.insertadmin=()=>{
    Admin.findOne({'email':'ADMIN@GMAIL.COM'}).exec()
    .then(data=>{
        if(data == null){
            let adminObj = Admin()
            adminObj.email='ADMIN@GMAIL.COM'
            adminObj.name='ADMIN'
            adminObj.password=bcrypt.hashSync('admin@123',saltRounds)
            adminObj.save()
            
        }else{
            

        }
    })
    .catch(err=>{
    })
}