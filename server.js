import express, { json } from "express";
import mongoose from "mongoose";
import userRouter from "./rutas/user.rutas.js";
import albumRouter from "./rutas/album.rutas";
import dotenv from "dotenv"
const app = express()
dotenv.config()
const port = process.env.PORT 
const url = process.env.url
import path from "path";

app.use("/health", (req, res) => res.sendStatus(200));
app.use('/', routes);

// const album = require("./models/album")
// const user = require("./models/user")

// const url = "mongodb+srv://marcelomastrogiovanni:nlNjcMfs9oeI32Ce@cluster0.mualxqj.mongodb.net/"

app.use(json())
app.use(express.static(path.join("public")));
app.use("./user", userRouter);
app.use("/band", albumRouter);

async function connectToMongo(){
    try{
        await mongoose.connect(url)
        app.listen(3000, ()=>{
            console.log("Server escuchando en puerto 3000 y DB conectada")
        })
        
    }catch(error){
        console.log(error)
    }
}

connectToMongo()




