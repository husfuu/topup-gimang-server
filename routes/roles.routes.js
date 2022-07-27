const router = require("express").Router();
const roles = require("../controllers/roles.controllers");

router.post("/roles", roles.createRole);
router.get("/roles/:id", roles.getRoleById);
router.get("/roles", roles.getAllRoles);
router.put("/roles/:id", roles.updateRoleById);
router.delete("/roles/:id", roles.deleteRoleById);

module.exports = router;
