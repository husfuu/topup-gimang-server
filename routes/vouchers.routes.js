const router = require("express").Router();
const voucherController = require("../controllers/vouchers.controllers");

router.post("/api/v1/vouchers", voucherController.createVoucher);
router.get("/api/v1/vouchers/:id", voucherController.getVoucherById);
router.get("/api/v1/vouchers", voucherController.getAllVouchers);
router.put("/api/v1/vouchers/:id", voucherController.updateVoucherById);
router.delete("/api/v1/vouchers/:id", voucherController.deleteVoucherById);

// view
router.get("/vouchers", voucherController.viewAllVouchers);
router.get("/vouchers/create", voucherController.viewCreateVouchers);
router.get("/vouchers/edit/:id", voucherController.viewEditVouchers);

// actions
router.post("/vouchers/create", voucherController.actionCreateVouchers);
router.post("/vouchers/edit/:id", voucherController.actionEditVouchers);
router.post("/vouchers/delete/:id", voucherController.actionDeleteVouchers);
module.exports = router;
