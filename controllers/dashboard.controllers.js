exports.viewDashboard = async (req, res) => {
    try {
        res.render('./admin/dashboard/view', {
            title: 'Halaman Dashboard',
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