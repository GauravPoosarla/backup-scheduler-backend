const backupRouter = require('express').Router();
const backupController = require('../controllers/backup');

backupRouter.post('/backup', backupController.backup);

module.exports = backupRouter;