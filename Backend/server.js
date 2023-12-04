const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const DB_URI = process.env.DB_URI;
const port = process.env.port || 3090;
const ownerRouter=require('./Routes/OwnerRoute')
const carRouter=require('./Routes/CarRoutes')
mongoose
  .connect(DB_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB"));


app.use("/Owner",ownerRouter)
app.use("/Car",carRouter)

app.listen(port, () => {
  console.log(`The Server is running on Port ${port}`);
});
