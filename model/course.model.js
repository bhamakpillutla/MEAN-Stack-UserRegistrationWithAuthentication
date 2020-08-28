const mongoose = require("mongoose");

var CourseSchema = new mongoose.Schema({
    courseName : {
        type : String,
        required : "Required"
    },
    courseId : {
        type : String
    },
    courseDuration: {
        type : String
    },
    courseFee : {
        type : String
    }

});

// collection Course with CourseSchema mongoose helps us to define the schema 
// for the database mongodb, inbuilt mongodb does not care about schema
mongoose.model("Course",CourseSchema)

