const express= require('express');


const app=express();

app.get('/',(req, res)=>{
    res.send("Listening")
})

app.listen(8000, ()=>{
    console.log("App is runing at Port 8000");
})