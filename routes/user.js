// routes/login.js

const express = require('express');
const router = express.Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');
const userController=this.require('../controllers/user.js');

// Protect the route with RBAC middleware
// router.get('/login', rbacMiddleware.checkPermission('read_record'), recordsController.getAllRecords);
router.get('/login',userController );

module.exports = router;