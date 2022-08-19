const router = require("express").Router();
const userbiodatasController = require("../controllers/userbiodatas.controllers");
// const authorize = require("../middlewares/authorize");

router.post("/api/v1/userbiodatas", userbiodatasController.createUserbiodata);
// masih bingung implement jika 2 path dari 2 API sama
router.get(
    "/api/v1/userbiodatas/",
    userbiodatasController.getUserbiodataByUserId,
);
router.get("/userbiodatas", userbiodatasController.getAllUserbiodatas);
router.put(
    "/api/v1/userbiodatas/:id",
    userbiodatasController.updateUserbiodataByUserId,
);

module.exports = router;
