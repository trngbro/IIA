const router = require("express").Router();
const adminControllers = require("../api/v1/controllers/adminController")
router.get('/', adminControllers.test)

module.exports = router;