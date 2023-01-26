const router = require('express').Router()
const notesController =require('../controller/notesController')
const assignmentController =require('../controller/assignmentController')
const lectureController =require('../controller/lectureController')
const testController =require('../controller/testController')

//Notes Upload 
const multer = require('multer')
const notesstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/notes')
    },
    filename: function (req, file, cb) {
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //const path = '/files/notes/'
      const new_name = uniqueSuffix+file.originalname
      cb(null, file.fieldname + '-' + new_name)
    }
  })
  const notes_upload = multer({ storage: notesstorage })
// End Notes upload

//Assignment Upload 
const assignmentstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/assignment')
    },
    filename: function (req, file, cb) {
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //const path = '/files/assignment/'
      const new_name = uniqueSuffix+file.originalname
      cb(null, file.fieldname + '-' + new_name)
    }
  })
  const assignment_upload = multer({ storage: assignmentstorage })
// End assignment upload

//Notes API
router.post('/add_notes',notes_upload.single('notes'),notesController.add_notes)
router.get('/get_notes',notesController.get_notes)
router.post('/delete_notes',notesController.delete_notes)

//Notes API
router.post('/add_assignment',assignment_upload.single('assignment'),assignmentController.add_assignment)
router.get('/get_assignment',assignmentController.get_assignment)
router.post('/delete_assignment',assignmentController.delete_assignment)

// Lecture API
router.post('/add_lecture',lectureController.add_lecture)
router.get('/get_lecture',lectureController.get_lecture)
router.post('/delete_lecture',lectureController.delete_lecture)

// Test API
router.post('/add_test',testController.add_test)
router.get('/get_test',testController.get_test)
router.post('/delete_test',testController.delete_test)






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