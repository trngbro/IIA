const router = require("express").Router();
const adminControllers = require("../api/v1/controllers/adminControllers")

router.get('/', adminControllers.index)
router.get('/students', adminControllers.student_list)
router.get('/departments', adminControllers.department_list)
router.get('/staff', adminControllers.staff_list)
router.get('/staff/add', adminControllers.staff_add)
router.get('/chatbot/upload', adminControllers.upload_form)


module.exports = router;