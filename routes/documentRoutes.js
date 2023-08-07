const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const { createDocument, viewDocuments, getDocuments, removeDocument } = require("../controllers/documentController");

const router = express.Router();

router.route('./createDocument').post(isAuthenticated, createDocument);

router.route('./viewDocuments').get(isAuthenticated, viewDocuments);

router.route('./getDocuments').get(isAuthenticated, authorizeRoles("System Administrator"), getDocuments);

router.route('./removeDocument').delete(isAuthenticated, authorizeRoles("System Administrator"), removeDocument);


module.exports = router