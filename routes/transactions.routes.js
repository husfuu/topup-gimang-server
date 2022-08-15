const router = require("express").Router();
const transactionController = require("../controllers/transactions.controllers");

router.get("/api/v1/transactions/", transactionController.getAllTransactions);
router.post(
    "/api/v1/transactions/",
    transactionController.createTransactionByUser,
);

// ADMIN
router.get("/transactions/", transactionController.viewAllTransactions);

router.post(
    "/transactions/status/:id",
    transactionController.updateTransactionStatusByAdmin,
);

module.exports = router;
