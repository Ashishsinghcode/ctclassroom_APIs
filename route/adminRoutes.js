const router = require('express').Router()
const userController = require('../controller/userController')
const departmentController = require('../controller/departmentController')
const courseController =require('../controller/courseController')
const semesterController =require('../controller/semesterController')
//Login API
router.post('/login',userController.login)

//Department API
router.post('/add_department',departmentController.add_department)
router.get('/get_department',departmentController.get_department)
router.delete('/delete_department/:_id',departmentController.delete_department)

//Course API
router.post('/add_course',courseController.add_course)
router.get('/get_course',courseController.get_course)
router.delete('/delete_course/:_id',courseController.delete_course)

//Semester API
router.post('/add_semester',semesterController.add_semester)
router.get('/get_semester',semesterController.get_semester)
router.delete('/delete_semester/:_id',semesterController.delete_semester)






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