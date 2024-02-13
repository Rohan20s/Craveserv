const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors');
const router = require('./routes/userRoutes.js');
const errorHandler = require('./Middleware/ErrorHandler.js');
const connectdb = require('./Config/db_connection.js');
// const passport = require("passport");
// const authRoute = require("./routes/auth");
const session = require("express-session");
// require("./Utils/passport");


const app = express()
const port = process.env.PORT
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))
connectdb(process.env.CONNECTION_STRING)
app.use(express.json())


// setup session
// app.use(session({ secret: 'secret',resave:false,saveUninitialized:true }))


// app.use(passport.initialize());
// app.use(passport.session());
 


app.use("/api/auth", router)

// Use the custom error handling middleware 
app.use(errorHandler);

app.listen(port, () => {
    console.log("server listening at http://localhost:8000")
})