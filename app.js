const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();


const db = async () => {
    try {
        const suceess = await mongoose.connect(process.env.DATABASE,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });

        console.log("DB conectada");

    } catch (error ) {
        console.log("DB Connection Error");
    }
}

db();

app.listen(port,() => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

