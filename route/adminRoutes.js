const router = require('express').Router()
const userController = require('../controller/userController')
const departmentController = require('../controller/departmentController')
const courseController =require('../controller/courseController')
const semesterController =require('../controller/semesterController')
const teacherController =require('../controller/teacherController')
const studentController =require('../controller/studentController')
const subjectController =require('../controller/subjectController')

// Login API
router.post('/login',userController.login)

// Department API
router.post('/add_department',departmentController.add_department)
router.get('/get_department',departmentController.get_department)
router.delete('/delete_department/:_id',departmentController.delete_department)

// Course API
router.post('/add_course',courseController.add_course)
router.get('/get_course',courseController.get_course)
router.delete('/delete_course/:_id',courseController.delete_course)

// Semester API
router.post('/add_semester',semesterController.add_semester)
router.get('/get_semester',semesterController.get_semester)
router.delete('/delete_semester/:_id',semesterController.delete_semester)

// Teacher API
router.post('/add_teacher',teacherController.add_teacher)
router.get('/get_teacher',teacherController.get_teacher)
router.post('/get_single_teacher',teacherController.get_single_teacher)
router.post('/update_teacher',teacherController.update_teacher)

// Subject API
router.post('/add_subject',subjectController.add_subject)
router.get('/get_subject',subjectController.get_subject)
router.delete('/delete_subject/:_id',subjectController.delete_subject)

// Student API
router.post('/add_student',studentController.add_student)
router.get('/get_student',studentController.get_student)
router.post('/get_single_student',studentController.get_single_student)
router.post('/update_student',studentController.update_student)




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