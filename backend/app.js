const express=require("express");
const cors=require("cors");
const routeRoutes = require("./routes/routeRoutes");
const authRoutes = require("./routes/authRoutes");
const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("backend is up and running");
});


app.use("/api/routes", routeRoutes);
app.use("/api/auth", authRoutes);


module.exports=app;
