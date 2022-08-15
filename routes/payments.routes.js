const router = require("express").Router();
const paymentController = require("../controllers/payments.controllers");

router.post("/api/v1/payments", paymentController.createPayment);
router.get("/api/v1/payments/:id", paymentController.getPaymentById);
router.get("/api/v1/payments", paymentController.getAllPayments);
router.put("/api/v1/payments/:id", paymentController.updatePaymentById);
router.delete("/api/v1/payments/:id", paymentController.deletePaymentById);

// view
router.get("/payments", paymentController.viewAllPayments);
router.get("/payments/create", paymentController.viewCreatePayments);
router.get("/payments/edit/:id", paymentController.viewEditPayments);

// actions
router.post("/payments/create", paymentController.actionCreatePayments);
router.post("/payments/edit/:id", paymentController.actionEditPayments);
router.post("/payments/delete/:id", paymentController.actionDeletePayments);

module.exports = router;
