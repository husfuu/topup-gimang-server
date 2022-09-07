const router = require("express").Router();
const playerControllers = require("../controllers/player.controllers");
const { isLoginPlayer } = require("../middlewares/auth");

router.get(
    "/api/v1/transaction-spent",
    isLoginPlayer,
    playerControllers.getSpentTransactions,
);

router.get(
    "/api/v1/latest-transactions",
    isLoginPlayer,
    playerControllers.getLatestTransactions,
);

router.get(
    "/api/v1/transactions/:id",
    isLoginPlayer,
    playerControllers.getTransactionDetails,
);

router.get(
    "/api/v1/transaction-spent-total",
    isLoginPlayer,
    playerControllers.getTotalTransactions,
);

module.exports = router;
