const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const employeeRoutes =require('./routes/employeeRoutes');

const app = express();
app.use(express.json());
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());


// Employee Routes

app.use('/api', employeeRoutes)



module.exports = app;