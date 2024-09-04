// routes/login.js

const express = require('express');
const router = express.Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');
const userController=require('../controllers/user.js');
const passport = require('passport');

// Protect the route with RBAC middleware
// router.get('/login', rbacMiddleware.checkPermission('read_record'), recordsController.getAllRecords);

router.get('/', (req, res)=>{
        res.render('welcome.ejs');
})
router.get('/login',userController.showForm);
router.post('/login',passport.authenticate('local', {failureRedirect: "/user/login"}),  userController.loginUser)
router.get('/add', rbacMiddleware.checkPermission('create_record'), userController.addUser);
module.exports = router;