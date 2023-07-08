const express = require("express");
const { createEmployee, employeeLogin, employeeLogout, getAllEmployees, getEmployeeDetails } = require('../controllers/employeeController');
const { isAuthenticated } = require("../middlewares/auth");


const router = express.Router()

router.route('/getAllEmployees').get(getAllEmployees);

router.route('/getEmployee/:id').get(isAuthenticated, getEmployeeDetails)

router.route('/addEmployee').post(createEmployee);

router.route("/login").post(employeeLogin);

router.route("/logout").post(employeeLogout);

module.exports = router;