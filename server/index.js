const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose")

const app = express();
const port = process.env.PORT || 3001;


//middlewear
app.use(cors());
app.use(express.json());

//mongoos
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("database connected")
});

app.get("/", (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log("surver is running");
})