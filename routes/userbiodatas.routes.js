const router = require("express").Router();
const userbiodatasController = require("../controllers/userbiodatas.controllers");

router.post("/userbiodatas", userbiodatasController.createUserbiodata);
// masih bingung implement jika 2 path dari 2 API sama
// router.get("/userbiodatas/", userbiodatasController.getUserbiodataByUserId);
router.get("/userbiodatas", userbiodatasController.getAllUserbiodatas);
router.put(
    "userbiodatas/:id",
    userbiodatasController.updateUserbiodataByUserId,
);

module.exports = router;
