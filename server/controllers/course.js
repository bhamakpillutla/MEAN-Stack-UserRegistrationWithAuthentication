const express = require("express");
const mongoose = require ("mongoose");

const router = express.Router();
const CourseModel = mongoose.model("Course");

router.get("/add", (req, res)=>{
   

    res.render("add-course");

});
router.post("/add", (req, res)=>{
    console.log(req.body)
    var course = new CourseModel();
    //insert document to db
    course.courseName = req.body.courseName,
    course.courseId = req.body.courseId,
    course.save((err, doc)=>{
        if(!err)
        {
            res.redirect("/course/List");
            // res.json({ message : " successfull", status : "OK"})
        }
        else{
            res.send("Error Occurred");
        }
    });
    // res.render("add-course");

});

router.get("/List", (req, res)=>{
    //Setting
    // var course = new CourseModel();
    // course.courseName = "NodeJS",
    // course.courseId = "2",
    // course.save();



    //Getting
    CourseModel.find((err, docs)=>{
        if(!err)
        {
            // console.log(docs);
            // res.send("Course Controller");
            res.render("list", { data : docs })
        }
        else
        {
            res.send("Error")
        }
    });
    
});




module.exports = router;
