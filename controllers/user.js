const User=require('../models/user');

module.export.showLoginForm((req, res)=>{
    res.render('login.ejs');

})