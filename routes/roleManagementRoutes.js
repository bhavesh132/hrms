const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { createRole, assignRole, getRoles } = require("../controllers/roleManagementController");

const router = express.Router()

router.route('/createRole').post(isAuthenticated, createRole);
router.route('/assignRole').post(isAuthenticated, assignRole);

router.route('/getRoles').get(isAuthenticated, getRoles)


module.exports = router