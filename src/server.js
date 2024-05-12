const express = require("express");
const mongoose = require("mongoose");
// const Contact = require("./Models/contactModel");
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

const startServer = async () => {
    try {
      await mongoose.connect(process.env.CONNECTIONSTRING);
      console.log("Connected to MongoDB");
  
      app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  
  startServer();