const express = require('express')
const { urlencoded } = require('express')
const server = express()
const port = 3000
var cors = require('cors')
server.use(urlencoded({extended:true}))
server.use(express.json({limit:'50mb'}))
server.use(cors())
server.use(express.static(__dirname + "/files/"))


//server.get('/', (res,req) => res.json('Hello'))

const adminroutes = require('./route/adminRoutes')
const teacherroutes = require('./route/teacherRoutes')
const studentroutes = require('./route/studentRoutes')
const admin = require('./config/seeder')
const database = require('./config/ctclassroom')

admin.insertadmin()
server.use('/ct',adminroutes)
server.use('/teacher',teacherroutes)
server.use('/student',studentroutes)

server.listen(port, ()=> console.log("Server Running at port"+port))
