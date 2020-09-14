require('./config/config');
const connection = require("./model/db");
const express = require("express");
const application = express();
const path = require("path");
const bodyparser = require("body-parser");
const cors = require('cors');

const rtsIndex = require('./routes/index.router');

// middleware
application.use(bodyparser.json());
application.use(cors());
application.use('/api',rtsIndex);

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




