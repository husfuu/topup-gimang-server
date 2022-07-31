const router = require("express").Router();
const nominalController = require("../controllers/nominals.controllers");

router.post("/api/v1/nominals", nominalController.createNominal);
router.get("/api/v1/nominals/:id", nominalController.getNominalById);
router.get("/api/v1/nominals/", nominalController.getAllNominal);
router.put("/api/v1/nominals/:id", nominalController.updateNominalById);
router.delete("/api/v1/nominals/:id", nominalController.deleteNominalById);

// view
router.get("/nominals", nominalController.viewAllNominals);
router.get("/nominals/create", nominalController.viewCreateNominals);
router.get("/nominals/edit/:id", nominalController.viewEditNominals);

// actions
router.post("/nominals/create", nominalController.actionCreateNominals);
router.post("/nominals/delete/:id", nominalController.actionDeleteNominals);
router.post("/nominals/edit/:id", nominalController.actionEditNominals);

module.exports = router;
