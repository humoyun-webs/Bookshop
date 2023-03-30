const express = require("express")
require("dotenv").config()
const app = express()
const {router} = require("./routes/routes.js")
const Port = process.env.Port || 8000
const fileUpload = require("express-fileupload")
const cors = require("cors")


app.use(express.json())
app.use(fileUpload())
app.use("/" ,router);
app.use(cors())

app.use("/image/",express.static(process.cwd() + "/upload"))

app.use("/*",(_,res)=>{
    res.sendStatus(404) 
})

app.listen(Port,()=>{
    console.log(`http://localhost:${Port} is connecting`);
})