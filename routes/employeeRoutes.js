const express = require("express");
const { createEmployee, employeeLogin } = require('../controllers/employeeController');


const router = express.Router()

router.route('/addEmployee').post(createEmployee);

router.route("/login").post(employeeLogin)

module.exports = router;