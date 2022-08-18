const router = require("express").Router();
const checkoutController = require("../controllers/checkout.controllers");
// const authorize = require("../middlewares/authorize");

router.post("/api/v1/checkout", checkoutController.actionCheckOut);
router.get("/api/v1/checkout", checkoutController.viewCheckOut);

module.exports = router;
