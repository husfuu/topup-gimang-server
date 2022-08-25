const router = require("express").Router();
const bankAccountController = require("../controllers/bankaccounts.controllers");
const isLoginAdmin = require("../middlewares/auth");

router.get(
    "/api/v1/bankaccounts/:id",
    bankAccountController.getBankAccountById,
);
router.get("/api/v1/bankaccounts", bankAccountController.getAllBankAccounts);

// view
router.get(
    "/bankaccounts",
    isLoginAdmin,
    bankAccountController.viewAllBankAccounts,
);
router.get(
    "/bankaccounts/create",
    isLoginAdmin,
    bankAccountController.viewCreateBankAccount,
);
router.get(
    "/bankaccounts/edit/:id",
    isLoginAdmin,
    bankAccountController.viewEditBankAccount,
);

// actions
router.post(
    "/bankaccounts/create",
    isLoginAdmin,
    bankAccountController.actionCreateBankAccount,
);
router.post(
    "/bankaccounts/edit/:id",
    isLoginAdmin,
    bankAccountController.actionEditBankAccount,
);
router.post(
    "/bankaccounts/delete/:id",
    isLoginAdmin,
    bankAccountController.actionDeleteBankAccount,
);

module.exports = router;
