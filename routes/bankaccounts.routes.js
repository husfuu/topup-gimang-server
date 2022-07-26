const router = require("express").Router();
const bankAccount = require("../controllers/bankaccounts.controllers");

router.post("/banks", bankAccount.createBankAccount);
router.get("/banks/:id", bankAccount.getBankAccountById);
router.get("/banks", bankAccount.getAllBankAccounts);
router.put("/banks/:id", bankAccount.updateBankAccountById);
router.delete("/banks/:id", bankAccount.deleteBankAccountById);

module.exports = router;
