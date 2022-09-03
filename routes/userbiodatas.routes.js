const router = require("express").Router();
const userbiodatasController = require("../controllers/userbiodatas.controllers");
const { isLoginPlayer } = require("../middlewares/auth");

// router.post("/api/v1/userbiodatas", userbiodatasController.createUserbiodata);
// masih bingung implement jika 2 path dari 2 API sama
router.get(
    "/api/v1/userbiodatas/",
    isLoginPlayer,
    userbiodatasController.getUserbiodataByUserId,
);
// router.get("/userbiodatas", userbiodatasController.getAllUserbiodatas);
router.put(
    "/api/v1/userbiodatas/",
    isLoginPlayer,
    userbiodatasController.updateUserbiodataByUserId,
);

module.exports = router;
