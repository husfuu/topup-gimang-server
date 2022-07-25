const router = require('express').Router();
const dashboardController = require('../controllers/dashboard.controllers');

router.get('/dashboard', dashboardController.viewDashboard);

module.exports = router;
