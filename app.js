const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidators = require("express-validator");
require("dotenv").config();
const {isJsonValidRequest} = require("./validators/index");

const port = process.env.PORT || 3000;


const authRoutes = require("./routes/auth");


const app = express();


const db = async () => {
    try {
        const suceess = await mongoose.connect(process.env.DATABASE,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        });

        console.log("DB conectada");

    } catch (error ) {
        console.log("DB Connection Error");
    }
}

db();

//middlewares
app.use(bodyParser.json());
app.use(isJsonValidRequest);
app.use(cookieParser());
app.use(expressValidators());
app.use(cors());


app.use("/api",authRoutes);


app.listen(port,() => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

