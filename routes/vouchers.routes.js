const router = require("express").Router();
const voucherController = require("../controllers/vouchers.controllers");
const multer = require("multer");
const os = require("os");
const { isLoginAdmin } = require("../middlewares/auth");

router.get("/api/v1/vouchers/:id", voucherController.getVoucherById);
router.get("/api/v1/vouchers", voucherController.getAllVouchers);

// view
router.get("/vouchers", isLoginAdmin, voucherController.viewAllVouchers);
router.get(
    "/vouchers/create",
    isLoginAdmin,
    voucherController.viewCreateVouchers,
);
router.get(
    "/vouchers/edit/:id",
    isLoginAdmin,
    voucherController.viewEditVouchers,
);

// actions
router.post(
    "/vouchers/create",
    multer({ dest: os.tmpdir() }).single("image"),
    isLoginAdmin,
    voucherController.actionCreateVouchers,
);
router.post(
    "/vouchers/edit/:id",
    isLoginAdmin,
    voucherController.actionEditVouchers,
);
router.post(
    "/vouchers/status/:id",
    isLoginAdmin,
    voucherController.actionEditStatusVouchers,
);
router.post(
    "/vouchers/delete/:id",
    isLoginAdmin,
    voucherController.actionDeleteVouchers,
);
module.exports = router;
