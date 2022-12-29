const { urlencoded } = require('express')
const express = require('express')
const server = express()
const port = 3000
var cors = require('cors')
server.use(urlencoded({extended:true}))
server.use(express.json({limit:'50mb'}))
server.use(cors())

const adminroutes = require('./route/adminRoutes')
const admin = require('./config/seeder')
const database = require('./config/ctclassroom')

admin.insertadmin()
server.use('/ct',adminroutes)

server.listen(port, ()=> console.log("Server Running at port"+port))