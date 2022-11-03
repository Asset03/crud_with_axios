require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const route = require('./server/routes/router')
const connectDB = require('./server/databases/connection')

const app = express()

const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'))

//connect to MONGO_DB
connectDB() 

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname,"views/ejs"))

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))

// load routes
app.use("/",route)

app.listen(PORT,()=>console.log(`Server started on http://localhost:${PORT}`))