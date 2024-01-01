const router = require("express").Router();
const adminControllers = require("../api/v1/controllers/adminControllers")
router.get('/', adminControllers.test)

module.exports = router;