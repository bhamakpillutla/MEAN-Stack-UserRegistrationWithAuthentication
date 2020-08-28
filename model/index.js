const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/examplemvc",{ useNewUrlParser: true } ,(error)=>{
    if(!error)
        {
            console.log("Success Connected");
        }
    else
        {
            console.log("Error connecting to database.");
        }
});

// define models with schemas
const Course = require("./course.model")
