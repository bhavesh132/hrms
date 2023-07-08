const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require('./middlewares/error');
const cookieParser = require("cookie-parser")

const employeeRoutes =require('./routes/employeeRoutes');

const app = express();
app.use(express.json());
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use(cookieParser())


// Employee Routes
app.use('/api', employeeRoutes);


app.use(errorHandler);


module.exports = app;