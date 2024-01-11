const router = require("express").Router();
const adminControllers = require("../api/v1/controllers/adminControllers")
const departmentController = require("../api/v2/Controllers/DepartmentController")

// router.get('/login', adminControllers.login)
router.get('/', adminControllers.index)
router.get('/students', adminControllers.student_list)
router.get('/departments', adminControllers.department_list)
router.get('/staff', adminControllers.staff_list)
router.get('/staff/add', adminControllers.staff_add)
router.get('/chatbot/upload', adminControllers.upload_form)

router.get('/v2/departments', departmentController.getList)
router.post('/v2/department/update', departmentController.updateDepartment)
router.get('/v2/department/add', departmentController.getAddPage)
router.post('/v2/department/add', departmentController.addDepartment)
router.delete('/v2/department/delete/:id', departmentController.deleteDepartment)
module.exports = router;