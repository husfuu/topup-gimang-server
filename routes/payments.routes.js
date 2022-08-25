const router = require("express").Router();
const paymentController = require("../controllers/payments.controllers");
const isLoginAdmin = require("../middlewares/auth");

router.get("/api/v1/payments/:id", paymentController.getPaymentById);
router.get("/api/v1/payments", paymentController.getAllPayments);

// view
router.get("/payments", isLoginAdmin, paymentController.viewAllPayments);
router.get(
    "/payments/create",
    isLoginAdmin,
    paymentController.viewCreatePayments,
);
router.get(
    "/payments/edit/:id",
    isLoginAdmin,
    paymentController.viewEditPayments,
);

// actions
router.post(
    "/payments/create",
    isLoginAdmin,
    paymentController.actionCreatePayments,
);
router.post(
    "/payments/edit/:id",
    isLoginAdmin,
    paymentController.actionEditPayments,
);
router.post(
    "/payments/status/:id",
    isLoginAdmin,
    paymentController.actionEditStatusPayments,
);
router.post(
    "/payments/delete/:id",
    isLoginAdmin,
    paymentController.actionDeletePayments,
);

module.exports = router;
