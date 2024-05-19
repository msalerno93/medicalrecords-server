const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const {
  getAllProviders,
  createProvider,
  getSingleProvider,
  editProvider,
  deleteProvider,
} = require("./Routes/providerRoutes");
const {
  createPatient,
  getAllPatients,
  getSinglePatient,
  editPatient,
  deletePatient,
} = require("./Routes/patientRoutes");
const {
  getAllInsurances,
  getSingleInsurance,
  createInsurance,
  editInsurance,
  deleteInsurance,
} = require("./Routes/insuranceRoutes");
const {
  getNotesByPatient,
  addNoteByPatient,
  deleteNoteByPatient,
  editNoteByPatient,
} = require("./Routes/patientNotesRoutes");
const { createUser, signInUser, signOutUser, getUserProfile, updateUserProfile } = require("./Routes/userRoutes");
const { auth } = require("./Middleware/auth");
dotenv.config();

mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

//              USER ROUTES
app.post("/user/signup", createUser);
app.post("/user/signin", signInUser);
app.post('user/signout', auth, signOutUser)
app.get('user/profile', auth, getUserProfile);
app.put('user//profile', auth, updateUserProfile);

//              PROVIDER ROUTES

//GET ALL PROVIDERS
app.get("/providers", auth, getAllProviders);
//CREATE NEW PROVIDER
app.post("/addprovider", auth, createProvider);
//GET SINGULAR PROVIDER
app.get("/provider/:id", auth, getSingleProvider);
//EDIT A PROVIDER
app.put("/provider/:id", auth, editProvider);
//DELETE PROVIDER
app.delete("/provider/:id", auth, deleteProvider);

//              PATIENT ROUTES

//GET ALL PATIENTS
app.get("/patients", auth, getAllPatients);
//GET SINGULAR PATIENT
app.get("/patient/:id", auth, getSinglePatient);
//CREATE NEW PATIENT
app.post("/addpatient", auth, createPatient);
//EDIT A PATIENT
app.put("/patient/:id", auth, editPatient);
//DELETE PROVIDER
app.delete("/patient/:id", auth, deletePatient);

//              PATIENT NOTES ROUTES

//GET ALL SINGULAR PATIENTS NOTES
app.get("/patient/:id/notes", auth, getNotesByPatient);
//ADD A NEW NOTE TO SPECIFIC PATIENT
app.post("/patient/:id/notes/add", auth, addNoteByPatient);
//DELETE SPECIFIC NOTE FOR PATIENT
app.delete("/patient/:id/notes/:nId/delete", auth, deleteNoteByPatient);
//EDIT A NOTE FOR PATIENT
app.put("/patient/:id/notes/:nId/edit", auth, editNoteByPatient);

//              INSURANCE ROUTES

//GET ALL INSURANCES
app.get("/insurances", auth, getAllInsurances);
//GET SINGULAR INSURANCE
app.get("/insurance/:id", auth, getSingleInsurance);
//CREATE NEW INSURANCE
app.post("/addinsurance", auth, createInsurance);
//EDIT A INSURANCE
app.put("/insurance/:id", auth, editInsurance);
//DELETE PROVIDER
app.delete("/insurance/:id", auth, deleteInsurance);

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
