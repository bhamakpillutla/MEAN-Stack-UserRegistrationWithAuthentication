const connection = require("./model");
const express = require("express");
const application = express();
const path = require("path");
const expressHandlebars = require("express-handlebars");
const _handlebars = require('handlebars');
const bodyparser = require("body-parser");

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const CourseController = require("./controllers/courses")


application.use(bodyparser.urlencoded({
    extended : true
}));

application.set('views', path.join(__dirname, "/views/"));

application.engine("hbs", expressHandlebars({
    extname : "hbs" ,
    defaultLayout : "mainlayout",
    layoutsDir : __dirname + "/views/layouts",
    handlebars: allowInsecurePrototypeAccess(_handlebars)

}));

application.set("view engine", "hbs")

application.get("/" , (req, res)=>{
    // res.send('<h1>Hello World</h1>')
    //template used is index.hbs
    res.render("index" , {});
});

application.use("/course", CourseController);

application.listen("3000" , ()=>{
    console.log("Server started");

});




