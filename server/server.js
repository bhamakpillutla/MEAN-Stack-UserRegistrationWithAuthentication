require('./config/config');
const connection = require("./model/db");
const express = require("express");
const application = express();
const path = require("path");
const expressHandlebars = require("express-handlebars");
const _handlebars = require('handlebars');
const bodyparser = require("body-parser");
const cors = require('cors');

const rtsIndex = require('./routes/index.router');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const CourseController = require('./controllers/course');

// middleware
application.use(bodyparser.json());
application.use(cors());
application.use('/api',rtsIndex);

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

// error handler
application.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

application.listen(process.env.PORT , ()=>{
    console.log(`Server started at port : ${process.env.PORT} `);

});




