const {
    Transactions,
    Vouchers,
    Userbiodatas,
    Categories,
} = require("../models");

exports.viewDashboard = async (req, res) => {
    try {
        const countTransactions = await Transactions.count();
        const countVouchers = await Vouchers.count();
        const countUserbiodatas = await Userbiodatas.count();
        const countCategories = await Categories.count();

        res.render("./admin/dashboard/view", {
            title: "Dashboard Page",
            countTransactions,
            countVouchers,
            countCategories,
            countUserbiodatas,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
    }
};
