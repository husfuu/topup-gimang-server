exports.viewCategories = async (req, res) => {
    try {
        res.render('./admin/category/view', {
            title: 'Category Page'
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