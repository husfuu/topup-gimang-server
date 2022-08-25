const router = require("express").Router();
const transactionController = require("../controllers/transactions.controllers");
const isLoginAdmin = require("../middlewares/auth");

router.get("/api/v1/transactions/", transactionController.getAllTransactions);
router.post(
    "/api/v1/transactions/",
    transactionController.createTransactionByUser,
);

// ADMIN
router.get(
    "/transactions/",
    isLoginAdmin,
    transactionController.viewAllTransactions,
);

router.post(
    "/transactions/status/:id",
    isLoginAdmin,
    transactionController.updateTransactionStatusByAdmin,
);

module.exports = router;
