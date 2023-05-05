const route = require('express').Router()
const userController= require('../controller/userController')
const AssignmentsubmitController= require('../controller/submitassignmentController')

//Notice Upload 
const multer = require('multer')
const assignmentstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/submitted_assignment')
    },
    filename: function (req, file, cb) {
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //const path = '/files/notice/'
      const new_name = uniqueSuffix+file.originalname
      cb(null, file.fieldname + '-' + new_name)
    }
  })
  const assignment_upload = multer({ storage: assignmentstorage })
  
// End Notice upload
//Login

route.post('/studentlogin',userController.studentLogin)

route.post('/get_sub_assignment',AssignmentsubmitController.get_submit_assignment)
route.use(require('../common/studentMiddleware'))
//Assignment Submission
route.post('/submit_assignment',assignment_upload.single('assignment'),AssignmentsubmitController.submit_assignment)


//ERROR PAGE
route.all("**",function(req,res){
    res.json({
        'status':404,
        'success':false,
        'message':'Page not found'
    })
})
//END ERROR PAGE
module.exports = route