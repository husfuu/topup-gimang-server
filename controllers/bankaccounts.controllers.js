const { BankAccounts } = require('../models');

exports.createBankAccount = async (req, res) => {
    try {
        const { name, accountNumber } = req.body;

        if (!name) {
            return res.status(401).json({
                status: 'FAILED',
                data: {
                    message: 'please fill bank name'
                }
            })
        }
        
        if (!accountNumber) {
            return res.status(401).json({
                status: 'FAILED',
                data: {
                    message: 'please fill account number'
                }
            }) 
        }

        const bankAccountExists = await BankAccounts.findOne({
            where: {
                name,
                accountNumber
            }
        })

        if (bankAccountExists) {
            return res.status(401).json({
                status: 'FAILED',
                data: {
                    message: 'bank account is already exists!'
                }
            })
        }
        
        const bankAccount = await BankAccounts.create({
            name,
            accountNumber
        })

        res.status(201).json({
            status: 'SUCCESS',
            data: {
                message: 'New Bank Account successfully created!',
                bankAccount
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack
            }
        })
    }
}

exports.getAllBankAccounts = async (req, res) => {
    try {
        const bankAccounts = await BankAccounts.findAll();

        if (!bankAccounts) {
            return res.status(401).json({
                status: 'FAILED',
                data: {
                    message: 'The bank accounts not found'
                }
            })
        };

        res.status(201).json({
            status: 'SUCCESS',
            data: {
                messsage: 'Successfully get all nominals',
                bankAccounts,
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack
            }
        })
    }
}

exports.getBankAccountById = async (req, res) => {
    try {
        const bankAccountId = req.params.id
        const bankAccount = await BankAccounts.findByPk(bankAccountId);

        if (!bankAccount) {
            return res.status(401).json({
                status: 'FAILED',
                data: {
                    message: `bank account with id = ${bankAccountId} not found`
                }
            })
        }

        res.status(201).json({
            status: 'SUCCESS',
            data: {
                message: 'Successfully get bank account!',
                bankAccount
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack
            }
        })
    }
}

exports.updateBankAccountById = async (req, res) => {
    try {
        const bankAccountId = req.params.id;
        const bankAccount = await BankAccounts.findByPk(bankAccountId);

        if (!bankAccount){
            return res.status(401).json({
                status: 'FAILED',
                data: {
                    message: 'bank account doesnt exist'
                }
            })
        }
        
        const { name, accountNumber } = req.body;

        if (!name) {
            return res.status(401).json({
                status: 'FAILED',
                data: {
                    message: 'please fill bank name'
                }
            })
        }
        
        if (!accountNumber) {
            return res.status(401).json({
                status: 'FAILED',
                data: {
                    message: 'please fill account number'
                }
            }) 
        }
        
        await BankAccounts.update({
            name,
            accountNumber
        },
        {
            where: {
                id: bankAccountId
            }
        })

        res.status(201).json({
            status: 'SUCCESS',
            data: {
                message: `Successfully update bank account with ${bankAccountId}`,
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: err.name,
                message: err.message,
                stack: err.stack,
            },
        });      
    }
}

exports.deleteBankAccountById = async (req, res) => {
    try {
        const bankAccountId = req.params.id;
        const bankAccount = await BankAccounts.findByPk(bankAccountId);

        if (!bankAccount) {
            return res.status(401).json({
                status: 'FAILED',
                data: {
                    message: 'bank account doesnt exist!'
                }
            })
        }

        const deletedBankAccount = await BankAccounts.destroy({
            where: {
                id: bankAccountId
            }
        })

        res.status(201).json({
            status: 'SUCCESS',
            data: {
                message: 'Successfully delete bank account'
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: err.name,
                message: err.message,
                stack: err.stack,
            },
        });      
    }
}