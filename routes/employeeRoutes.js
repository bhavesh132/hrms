const express = require("express");
const { createEmployee } = require('../controllers/employeeController');


const router = express.Router()

router.route('/addEmployee').post(createEmployee);

module.exports = router;