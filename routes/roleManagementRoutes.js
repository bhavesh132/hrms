const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const {
  createRole,
  assignRole,
  getRoles,
  removeRole,
  unassignRole,
} = require("../controllers/roleManagementController");

const router = express.Router();

router
  .route("/createRole")
  .post(isAuthenticated, authorizeRoles("System Administrator"), createRole);
router
  .route("/assignRole")
  .post(isAuthenticated, authorizeRoles("System Administrator"), assignRole);

router.route("/removeRole").post(isAuthenticated, authorizeRoles("System Administrator"), removeRole)

router.route("/unassignRole").post(isAuthenticated, authorizeRoles("System Administrator", unassignRole))

router.route("/getRoles").get(isAuthenticated, authorizeRoles("System Administrator"), getRoles)

router.route("/getRoles").get(isAuthenticated, getRoles);

module.exports = router;
