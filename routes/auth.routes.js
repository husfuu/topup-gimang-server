const router = require("express").Router();
const authControllers = require("../controllers/auth.controllers");

router.post("/api/v1/signup", authControllers.signUp);
router.post("/api/v1/signin", authControllers.signIn);

module.exports = router;
