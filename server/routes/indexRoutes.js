const router = require("express").Router();
const indexControllers = require("../api/v1/controllers/indexControllers")

router.post('/', indexControllers.loginChecking)
router.post('/validate', indexControllers.validateToken)

module.exports = router;