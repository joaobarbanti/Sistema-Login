const controllers = require("../controllers/Controller");
const { Router } = require("express");
const router = Router();

router.post("/api/register", controllers.RegisterUser);
router.post("/api/login", controllers.LoginUser);

module.exports = router;
