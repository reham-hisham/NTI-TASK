const router = require('express').Router()
const task = require("../controller/tasks.controllers")
router.get("/",task.showall)
router.get("/add",task.addTask)
router.get("/showAll",task.showall)

router.get("/showOneTask/:title", task.showOne)
router.get("/edit/:title", task.edit)
router.post("/edit/:title", task.edditFunctions)
router.get("/del/:title",task.del)
router.post('/delAll', task.delAll)










module.exports=router