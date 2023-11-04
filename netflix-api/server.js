const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

const uri=process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());

const start = async () => {
    try{

        await mongoose.connect(uri);
        console.log("Database Connected!!!")
    }
    catch(err){
        console.log(err);
    }
}

start();

app.use("/api/user", userRoutes);
app.listen(PORT, ()=>{
    console.log(`Connected Port ${PORT}!!!`);
});
// app.listen(5000, console.log("server started"));