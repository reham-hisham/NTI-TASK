// required packges 
const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
app.use( express.static(path.join( __dirname, "../frontend/static")) )
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../frontend/views"))
hbs.registerPartials(path.join(__dirname, "../frontend/layout"))
app.use(express.urlencoded({extended:true}))
const playerRoutes = require("../routes/tasks.routes.js")
app.use(playerRoutes)

app.get('*', (req,res)=> res.send('page not found'))
app.post('*', (req,res)=> res.send('page not found'))

module.exports = app