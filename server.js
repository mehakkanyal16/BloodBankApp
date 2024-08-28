const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/DB.JS");
// dot config
dotenv.config();
const app=express();
connectDB();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// rest object

app.use('/api/v1/test',require("./routes/testRoutes"));

// port
const PORT=process.env.PORT||8000;
// listen
app.listen(PORT,()=>{
    console.log(`Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
      .bgBlue.white);
})