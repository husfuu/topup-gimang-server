const router = require("express").Router();
const voucher = require("../controllers/vouchers.controllers");

router.post("/vouchers", voucher.createVoucher);
router.get("/vouchers/:id", voucher.getVoucherById);
router.get("/vouchers", voucher.getAllVouchers);
router.put("/vouchers/:id", voucher.updateVoucherById);
router.delete("/vouchers/:id", voucher.deleteVoucherById);

module.exports = router;
