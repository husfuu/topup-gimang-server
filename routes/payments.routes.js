const router = require("express").Router();
const payment = require("../controllers/payments.controllers");

router.post("/payments", payment.createPayment);
router.get("/payments/:id", payment.getPaymentById);
router.get("/payments", payment.getAllPayments);
router.put("/payments/:id", payment.updatePaymentById);
router.delete("/payments/:id", payment.deletePaymentById);

module.exports = router;
