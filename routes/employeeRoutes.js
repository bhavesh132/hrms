const express = require("express");
const { createEmployee, employeeLogin, employeeLogout, getAllEmployees, getEmployeeDetails, employeeProfile } = require('../controllers/employeeController');
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const router = express.Router()

router.route('/getAllEmployees').get(isAuthenticated, authorizeRoles("System Administrator"), getAllEmployees);

router.route('/getEmployee/:id').get(isAuthenticated, authorizeRoles("System Administrator") ,getEmployeeDetails)

router.route('/addEmployee').post(isAuthenticated, authorizeRoles("System Administrator"),createEmployee);

router.route('/me').get(isAuthenticated, employeeProfile)

router.route("/login").post(employeeLogin);

router.route("/logout").post(employeeLogout);

module.exports = router;