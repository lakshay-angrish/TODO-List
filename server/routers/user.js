const router = require("express").Router();
const controller = require("../controllers/user");

router.post("/signUp", controller.signUp);
router.post("/logIn", controller.logIn);
router.put("/changePassword", controller.changePassword);

module.exports = router;
