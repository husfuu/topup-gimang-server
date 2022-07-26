const router = require("express").Router();
const nominalController = require("../controllers/nominals.controllers");

router.post("/nominals", nominalController.createNominal);
router.get("/nominals/:id", nominalController.getNominalById);
router.get("/nominals/", nominalController.getAllNominal);
router.put("/nominals/:id", nominalController.updateNominalById);
router.delete("/nominals/:id", nominalController.deleteNominalById);

module.exports = router;
