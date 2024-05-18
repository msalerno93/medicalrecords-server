const Patient = require("../Models/patientModel.js");

//GET ALL PATIENTS - /patients
const getAllPatients = async (req, res) => {
  try {
    const result = await Patient.find();
    res.send({ patients: result });
  } catch (error) {
    res.status(500).json({ error: "There was an error that occured" });
  }
};

const getNotesByPatient = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Patient.findById(id);
    res.send(result.notes)
  } catch (error) {}
};

const addNoteByPatient = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Patient.findById(id);
    const newNote = req.body
    result.notes.push(newNote)
    const addedNote = await result.save()
 
    console.log(result);
    res.send(addedNote)
  } catch (error) {
    console.log(error);
  }
}

//CREATE A SINGLE PATIENT - /addpatient
const createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  try {
    await patient.save();
    res.status(201).json({ patient });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Unable to create Patient" });
  }
};

//GET A SINGLE PATIENT - SHOWPAGE
const getSinglePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
    } else {
      res.json({ patient });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

//EDIT A PATIENT
const editPatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const result = await Patient.replaceOne({ _id: patientId }, req.body);
    res.json({ updatedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

//DELETE A PATIENT
const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const result = await Patient.deleteOne({ _id: patientId });
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong deleting contact" });
  }
};

module.exports = {
  getAllPatients,
  createPatient,
  getSinglePatient,
  editPatient,
  deletePatient,
  getNotesByPatient,
  addNoteByPatient
};
