const express= require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hamza:167167ham.a@rbac.1birt.mongodb.net/?retryWrites=true&w=majority&appName=RBAC";
const User=require("./models/user");
const mongoose=require('mongoose');
const passport = require(`passport`); //to use authentication and authorization
const LocalStrategy = require(`passport-local`); // it is local stretgy to  login user
const session=require('express-session');
const ejsMate = require(`ejs-mate`); //To make layouts boilerplate in ejs
const path = require(`path`); //to join path of static files
const methodOverride = require(`method-override`); //to send put post patch request from form

async function main() {
    await mongoose.connect("mongodb+srv://hamza:167167ham.a@rbac.1birt.mongodb.net/RBAC?retryWrites=true&w=majority&appName=RBAC");
    console.log("Connected Successfully to database");
  }
 main().catch((err) => console.log(err));

const app=express();

const userRoute = require("./routes/user.js");

app.get(`/fakeuser`, async (req, res) => {
    const { username, password, role } = {"username":'thehamza', "password": "167167", "role":"admin"};
    const user = new User({ username, role });
    User.register(user, password, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User registered successfully' });
      });
   
  });
const sessionOptions = {
  resave: false,
  secret: "myKey",
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(passport.initialize()); //It initialize the passport lib
app.use(passport.session()); //it starts the session so same user can to different tabs
passport.use(new LocalStrategy(User.authenticate())); // It create the new local stretgy in passpor

passport.serializeUser(User.serializeUser()); // It initiate when user start the session
passport.deserializeUser(User.deserializeUser()); //It terminate everything when user end session
    
// app.engine('html', require('ejs').renderFile); if you want to render HTML file
app.set('view engine', 'ejs');
app.engine(`ejs`, ejsMate);
app.set('views', path.join(__dirname,'views' ))
app.use(express.urlencoded({ extended: true }));

app.get('/',(req, res)=>{
  res.render('welcome');
})
app.use('/user', userRoute);



app.listen(8000, ()=>{
    console.log("App is runing at Port 8000");
})