//set up express
const express = require("express");
const app = express();

//requires session and flash
const session = require("express-session");
const flash = require("connect-flash") 


//check if in production or development
if (process.env.NODE_ENV == 'development') {
    require('dotenv').config();
}




//express-session middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized:false
}))
//flash middleware
app.use(flash());

//routes
const routes = require("./routes/routes")

//PORT
let PORT = process.env.PORT || 4000;

//body-parser
app.use(express.urlencoded({ extended: false }));


//set up ejs
app.set("view engine", 'ejs');

//static files middleware
app.use(express.static(__dirname + '/public'));

//routes middleware
app.use('/', routes);

// listen to port 
app.listen(PORT);