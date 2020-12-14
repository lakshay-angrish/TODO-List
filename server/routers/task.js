const router = require("express").Router();
const controller = require("../controllers/task");

router.get("/allTasks", controller.getAllTasks);
router.post("/newTask", controller.addTask);
router.post("/editTask", controller.editTask);

router.put("/updateStatus", controller.updateStatus);
router.put("/deleteTask", controller.deleteTask);

router.post("/searchTask", controller.searchTask);
router.post("/searchTaskfil", controller.searchTaskFil);

module.exports = router;
