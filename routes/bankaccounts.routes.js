const router = require("express").Router();
const bankAccountController = require("../controllers/bankaccounts.controllers");

router.post("/api/v1/bankaccounts", bankAccountController.createBankAccount);
router.get(
    "/api/v1/bankaccounts/:id",
    bankAccountController.getBankAccountById,
);
router.get("/api/v1/bankaccounts", bankAccountController.getAllBankAccounts);
router.put(
    "/api/v1/bankaccounts/:id",
    bankAccountController.updateBankAccountById,
);
router.delete(
    "/api/v1/bankaccounts/:id",
    bankAccountController.deleteBankAccountById,
);

// view
router.get("/bankaccounts", bankAccountController.viewAllBankAccounts);
router.get("/bankaccounts/create", bankAccountController.viewCreateBankAccount);
router.get("/bankaccounts/edit/:id", bankAccountController.viewEditBankAccount);

// actions
router.post(
    "/bankaccounts/create",
    bankAccountController.actionCreateBankAccount,
);
router.post(
    "/bankaccounts/edit/:id",
    bankAccountController.actionEditBankAccount,
);
router.post(
    "/bankaccounts/delete/:id",
    bankAccountController.actionDeleteBankAccount,
);

module.exports = router;
