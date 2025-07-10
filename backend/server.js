const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv").config();
const app=require("./app");

const port=process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI).then(()=> {
    console.log("MongoDb connected");
    app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
});
})
.catch((err)=>{
    console.error("mongodb connection failed..");
});



