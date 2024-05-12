const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv");
const { getAllProviders, createProvider, getSingleProvider, editProvider, deleteProvider } = require("./Routes/providerRoutes");
dotenv.config();

mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))


//              PROVIDER ROUTES

//GET ALL PROVIDERS
app.get('/provider', getAllProviders)
//CREATE NEW PROVIDER
app.post('/addprovider', createProvider)
//GET SINGULAR PROVIDER
app.get('/providers/:id', getSingleProvider)
//EDIT A PROVIDER
app.put('/providers/:id', editProvider)
//DELETE PROVIDER
app.delete('/providers/:id', deleteProvider)


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