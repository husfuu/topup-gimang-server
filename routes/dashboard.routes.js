const router = require("express").Router();
const dashboardController = require("../controllers/dashboard.controllers");

const isLoginAdmin = require("../middlewares/auth");

// router.use(isLoginAdmin);
router.get("/", isLoginAdmin, dashboardController.viewDashboard);

module.exports = router;
