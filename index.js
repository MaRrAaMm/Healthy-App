import dotenv from "dotenv";
import express from "express";
import bootstrap from "./src/App.controller.js";

// dotenv.config();
dotenv.config();
const app = express();
bootstrap(app,express);
const port = process.env.PORT||3000;
app.listen(port, ()=>{
    console.log("server is running in port", port);
});
