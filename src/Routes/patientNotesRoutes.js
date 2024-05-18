const Patient = require("../Models/patientModel.js");

//GET NOTES FOR INDIVIDUAL PATIENT
const getNotesByPatient = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Patient.findById(id);
    res.send(result.notes)
  } catch (error) {}
};


//ADD NOTE FOR SPECIFIC PATIENT
const addNoteByPatient = async (req, res) => {
  const id = req.params.id
  const newNote = req.body
  try {
    const result = await Patient.findById(id);
    const updatedNotes = [...result.notes, newNote]
    result.notes = updatedNotes
    const addedNote = await result.save()
     res.send(addedNote)
  } catch (error) {
    console.log(error);
  }
}


//DELETE SPECIFIC NOTE FROM PATIENT
const deleteNoteByPatient = async(req, res) => {
  const {id, nId} = req.params
  try {
    const patient = await Patient.findById(id);
    if(!patient){
      return res.status(404).send("Person not found")
    }
    const note = patient.notes.id(nId)
    if(!note){
      return res.status(404).send("Note not found")
    }
    console.log(note);

    note.deleteOne({ _id: nId })
    await patient.save()
    res.status(200).send("Its deleted")

  } catch (error) {
    console.log(error);
  }
}


//EDIT NOTE FOR PATIENT
const editNoteByPatient = async (req, res) => {
  const {id, nId} = req.params
  const updateNote = req.body

  try {
    const patient = await Patient.findById(id);
    if(!patient){
      return res.status(404).send("Person not found")
    }
    const note = patient.notes.id(nId)
    if(!note){
      return res.status(404).send("Note not found")
    }
    note.note = updateNote.note || note.note
    note.provider = updateNote.provider || note.provider
    note.date = updateNote.date || note.date
    const result = await patient.save()
    res.status(201).send(result)
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getNotesByPatient,
  addNoteByPatient,
  deleteNoteByPatient,
  editNoteByPatient
}