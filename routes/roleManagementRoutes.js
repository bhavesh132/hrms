const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const { createRole, assignRole, getRoles } = require("../controllers/roleManagementController");

const router = express.Router()

router.route('/createRole').post(isAuthenticated, authorizeRoles("System Administrator"), createRole);
router.route('/assignRole').post(isAuthenticated, authorizeRoles("System Administrator"), assignRole);

router.route('/getRoles').get(isAuthenticated, getRoles)

module.exports = router