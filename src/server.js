const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv");
const { getProvider, createProvider } = require("./Routes/providerRoutes");
dotenv.config();

mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/provider', getProvider)
app.post('/addprovider', createProvider)

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