const Note = require("../Models/noteModel.js");
const Patient = require("../Models/patientModel.js");

//GET ALL NOTES - /notes
const getAllNotes = async (req, res) => {
  try {
    if (req.body.params == Note.patientId) {
      const result = await Note.find();
      res.send({ notes: result});
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error that occured" });
  }
};

//CREATE A SINGLE NOTE - /addnote
const createNote = async (req, res) => {
  const note = new Note(req.body);
  try {
    await note.save();
    res.status(201).json({ note });
  } catch (error) {
    res.status(400).json({ error: "Unable to create Note" });
  }
};

//GET A SINGLE NOTE - SHOWPAGE
// const getSingleNote = async (req, res) => {
//   try {
//     const noteId = req.params.id;
//     const note = await Note.findById(noteId);
//     if (!note) {
//       res.status(404).json({ error: "Note not found" });
//     } else {
//       res.json({ note });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong!" });
//   }
// };

//EDIT A NOTE
// const editNote = async (req, res) => {
//   try {
//     const noteId = req.params.id;
//     const result = await Note.replaceOne({ _id: noteId }, req.body);
//     res.json({ updatedCount: result.modifiedCount });
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong!" });
//   }
// };

// //DELETE A NOTE
// const deleteNote = async (req, res) => {
//   try {
//     const noteId = req.params.id;
//     const result = await Note.deleteOne({ _id: noteId });
//     res.json({ deletedCount: result.deletedCount });
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong deleting contact" });
//   }
// };

module.exports = {
  getAllNotes,
  createNote,
  //   getSingleNote,
  //   editNote,
  //   deleteNote,
};
