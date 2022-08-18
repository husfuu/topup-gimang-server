const router = require("express").Router();
const adminControllers = require("../controllers/admins.controllers");

router.post("/api/v1/admins", adminControllers.createAdmin);
router.delete("/api/v1/admins/:id", adminControllers.deleteAdminById);

module.exports = router;
