const User=require('../models/user');

module.exports.showForm=((req, res)=>{
    res.render('login.ejs');

})

module.exports.loginUser=((req, res)=>{
    console.log("User loged in Successfully");
    // console.log(req.user);

    // if(req.user.role==="admin")
    //     res.render('/');
    // else if(req.user.role==="employee")
    //     res.render("employeeDash.ejs");
    res.redirect('/')
})

module.exports.addUser=((req, res)=>{
    res.send("You can add new User successfully");
})