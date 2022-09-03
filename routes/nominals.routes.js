const router = require("express").Router();
const nominalController = require("../controllers/nominals.controllers");
const { isLoginAdmin } = require("../middlewares/auth");

router.get("/api/v1/nominals/:id", nominalController.getNominalById);
router.get("/api/v1/nominals/", nominalController.getAllNominal);

// view
router.get("/nominals", isLoginAdmin, nominalController.viewAllNominals);
router.get(
    "/nominals/create",
    isLoginAdmin,
    nominalController.viewCreateNominals,
);
router.get(
    "/nominals/edit/:id",
    isLoginAdmin,
    nominalController.viewEditNominals,
);

// actions
router.post("/nominals/create", nominalController.actionCreateNominals);
router.post("/nominals/edit/:id", nominalController.actionEditNominals);
router.post("/nominals/delete/:id", nominalController.actionDeleteNominals);

module.exports = router;
