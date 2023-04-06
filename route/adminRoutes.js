const router = require('express').Router()
const userController = require('../controller/userController')
const departmentController = require('../controller/departmentController')
const courseController =require('../controller/courseController')
const semesterController =require('../controller/semesterController')
const teacherController =require('../controller/teacherController')
const studentController =require('../controller/studentController')
const subjectController =require('../controller/subjectController')
const noticeController =require('../controller/noticeController')
const mailerController = require('../controller/mailerController')

//Notice Upload 
const multer = require('multer')
const noticestorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/notice')
    },
    filename: function (req, file, cb) {
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //const path = '/files/notice/'
      const new_name = uniqueSuffix+file.originalname
      cb(null, file.fieldname + '-' + new_name)
    }
  })
  const notice_upload = multer({ storage: noticestorage })
// End Notice upload

// Login API
router.post('/login',userController.login)

// Department API
router.post('/add_department',departmentController.add_department)
router.get('/get_department',departmentController.get_department)
router.post('/delete_department',departmentController.delete_department)

// Course API
router.post('/add_course',courseController.add_course)
router.get('/get_course',courseController.get_course)
router.post('/delete_course',courseController.delete_course)

// Semester API
router.post('/add_semester',semesterController.add_semester)
router.get('/get_semester',semesterController.get_semester)
router.post('/delete_semester',semesterController.delete_semester)

// Teacher API
router.post('/add_teacher',teacherController.add_teacher)
router.get('/get_teacher',teacherController.get_teacher)
router.post('/get_single_teacher',teacherController.get_single_teacher)
router.post('/update_teacher',teacherController.update_teacher)

// Subject API
router.post('/add_subject',subjectController.add_subject)
router.get('/get_subject',subjectController.get_subject)
router.post('/delete_subject',subjectController.delete_subject)

// Student API
router.post('/add_student',studentController.add_student)
router.get('/get_student',studentController.get_student)
router.post('/get_single_student',studentController.get_single_student)
router.post('/update_student',studentController.update_student)

//Notice API
router.post('/add_notice',notice_upload.single('notice'),noticeController.add_notice)
router.get('/get_notice',noticeController.get_notice)
router.post('/delete_notice',noticeController.delete_notice)

// Mailer
router.post('/mailer',mailerController.mailer)




//ERROR PAGE
router.all("**",function(req,res){
     res.json({
         'status':404,
         'success':false,
         'message':'Page not found'
     })
})
//END ERROR PAGE
module.exports = router