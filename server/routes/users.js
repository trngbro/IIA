const express = require('express');
const router = express.Router();
const userController = require("../api/v1/controllers/users");
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require("../api/v1/services/passport");

router.get('/login', forwardAuthenticated, userController.getLoginForm);
router.get('/google', forwardAuthenticated, userController.authenticateWithGoogle);
router.get('/google/callback', userController.handleGoogleCallback);
router.get('/success', ensureAuthenticated, userController.getSuccessPage);
router.get('/failure', userController.getFailurePage);

module.exports = router;
