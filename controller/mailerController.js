async function  mailer(req,res){
    "use strict";
const nodemailer = require("nodemailer");

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "vaughn.bernhard@ethereal.email", // generated ethereal user
      pass: "ydn5vuhX6fhKERHZ2f", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Ashish singh 👻" <Ashish@gmail.com>', // sender address
    to: "ashish9471847@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "This mail is send by the server", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

mailer().catch(console.error);

module.exports ={
    mailer
}