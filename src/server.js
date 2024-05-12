const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv");
const { getAllProviders, createProvider, getSingleProvider, editProvider, deleteProvider } = require("./Routes/providerRoutes");
const { createPatient, getAllPatients, getSinglePatient, editPatient, deletePatient } = require("./Routes/patientRoutes");
const { getAllInsurances, getSingleInsurance, createInsurance, editInsurance, deleteInsurance } = require("./Routes/insuranceRoutes");
dotenv.config();

mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))


//              PROVIDER ROUTES

//GET ALL PROVIDERS
app.get('/providers', getAllProviders)
//CREATE NEW PROVIDER
app.post('/addprovider', createProvider)
//GET SINGULAR PROVIDER
app.get('/provider/:id', getSingleProvider)
//EDIT A PROVIDER
app.put('/provider/:id', editProvider)
//DELETE PROVIDER
app.delete('/provider/:id', deleteProvider)


//              PATIENT ROUTES

//GET ALL PATIENTS
app.get('/patients', getAllPatients)
//GET SINGULAR PATIENT
app.get('/patient/:id', getSinglePatient)
//CREATE NEW PATIENT
app.post('/addpatient', createPatient)
//EDIT A PATIENT
app.put('/patient/:id', editPatient)
//DELETE PROVIDER
app.delete('/patient/:id', deletePatient)


//              INSURANCE ROUTES

//GET ALL INSURANCES
app.get('/insurances', getAllInsurances)
//GET SINGULAR INSURANCE
app.get('/insurance/:id', getSingleInsurance)
//CREATE NEW INSURANCE
app.post('/addinsurance', createInsurance)
//EDIT A INSURANCE
app.put('/insurance/:id', editInsurance)
//DELETE PROVIDER
app.delete('/insurance/:id', deleteInsurance)

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