const express= require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hamza:167167ham.a@rbac.1birt.mongodb.net/?retryWrites=true&w=majority&appName=RBAC";
const User=require("./models/user");
const mongoose=require('mongoose');


async function main() {
    await mongoose.connect("mongodb+srv://hamza:167167ham.a@rbac.1birt.mongodb.net/RBAC?retryWrites=true&w=majority&appName=RBAC");
    console.log("Connected Successfully to database");
  }
  main().catch((err) => console.log(err));


const app=express();

app.get('/',(req, res)=>{
    res.send("Listening")
})

app.get(`/fakeuser`, async (req, res) => {
    const { username, password, role } = {"username":'Hamza', "password": "hamza", "role":"employee"};
    const user = new User({ username, role });
    User.register(user, password, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User registered successfully' });
      });
   
  });


    


app.listen(8000, ()=>{
    console.log("App is runing at Port 8000");
})