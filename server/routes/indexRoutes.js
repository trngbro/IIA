const router = require("express").Router();
const indexControllers = require("../api/v1/controllers/indexControllers")
const protect = require("../api/v1/middlewares/validate")
router.post('/', indexControllers.loginChecking)
router.post('/validate', indexControllers.validateToken)
// router.post('/listContact', protect, indexControllers.listContact)

module.exports = router;