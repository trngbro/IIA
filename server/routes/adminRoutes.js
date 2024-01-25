const router = require("express").Router();
const adminControllers = require("../api/v1/controllers/adminControllers")
const departmentController = require("../api/v2/Controllers/DepartmentController")
const staffController = require("../api/v2/Controllers/StaffController")
const qAController = require("../api/v2/Controllers/QAController")

router.get('/login', adminControllers.login)
router.post('/login', adminControllers.loginChecking)
router.get('/v2/home', adminControllers.index)
router.get('/logout', adminControllers.logOut)
// router.get('/students', adminControllers.student_list)
// router.get('/departments', adminControllers.department_list)
// router.get('/staff', adminControllers.staff_list)
// router.get('/staff/add', adminControllers.staff_add)
// router.get('/chatbot/upload', adminControllers.upload_form)

router.get('/v2/departments', departmentController.getList)
router.post('/v2/department/update', departmentController.updateDepartment)
router.get('/v2/department/add', departmentController.getAddPage)
router.post('/v2/department/add', departmentController.addDepartment)
router.delete('/v2/department/delete/:id', departmentController.deleteDepartment)
router.get('/v2/getAllDepartment', departmentController.getAllDepartment)

router.get('/v2/staff',staffController.staff_list)
router.get('/v2/staff/add',staffController.getAddStaffPage)
router.post('/v2/staff/loadstaff',staffController.loadStaff)
router.post('/v2/staff/add',staffController.addStaff)
router.post('/v2/staff/update',staffController.updateStaff)
router.delete('/v2/staff/delete/:id', staffController.deleteStaff)

router.get('/v2/chatbot/addQA', qAController.getAddQAPage)
router.post('/v2/chatbot/addQA', qAController.addQA)
module.exports = router;