const mongo = require('mongoose')

mongo.connect("mongodb+srv://Ashishsinghcode:7726525@ctclassroom.wn4rvuq.mongodb.net/Ctclassroom?retryWrites=true&w=majority")
.then((res)=>{
    console.log("Connection established")
})
.catch((err)=>{

    console.log("connection not established")
})