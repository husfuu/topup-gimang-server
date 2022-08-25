const router = require("express").Router();
const adminAuthControllers = require("../controllers/adminAuth.controllers");

router.get("/signin", adminAuthControllers.viewSignIn);
router.post("/signin", adminAuthControllers.actionSignIn);
router.get("/signout", adminAuthControllers.actionSignOut);

module.exports = router;
