
const nodemailer = require("nodemailer");

function mailer(req,res){
 
  let validators=''
  if(req.body == null || req.body.email == undefined || req.body.email == '' ){
     validators += 'email required'
      
  }
  if(req.body == null || req.body.title == undefined || req.body.title == '' ){
     validators += 'Title required'
  
  }
  if(req.body == null || req.body.description == undefined || req.body.description == '' ){
     validators += 'Message required'
  
  }
  if(!!validators){
      res.json({
          'status':422,
          'success':false,
          'message':validators
      })
  }
  else{
    console.log(req.file)
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "ctclassroom.code@gmail.com", 
        pass: "puuzuudxvkgjzcmt", 
      },
    });
    if(req.file){
      var mailbody={
        from: '"CT Institute"<ctclassroom.code@gmail.com> ', // sender address
        to: req.body.email, // list of receivers
      subject: req.body.title, // Subject line
      text: req.body.description, // plain text body
         attachments: [
           {
            
               filename: req.file.filename,
               path: 'E:/Project/ctclassroom_APIs/files/notice/'+req.file.filename,
           }
       ]
    }
    }else{
      var mailbody={
        from: '"CT Institute"<ctclassroom.code@gmail.com> ', // sender address
        to: req.body.email, // list of receivers
      subject: req.body.title, // Subject line
      text: req.body.description, // plain text body
      
    }
  }
  let info =transporter.sendMail(mailbody,function(err,info){
    if(err){
      console.log(err)
    }else{
      res.json({
        'status':200,
        'success':true,
        'message':"Mail send successfully"
      })
    }
  });
}
}

module.exports ={
  mailer
}