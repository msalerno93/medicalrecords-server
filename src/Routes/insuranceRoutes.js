const Insurance = require("../Models/insuranceModel.js");

//GET ALL INSURANCES - /insurances
const getAllInsurances = async (req, res) => {
  try {
    const result = await Insurance.find();
    res.send({ insurances: result });
  } catch (error) {
    res.status(500).json({ error: "There was an error that occured" });
  }
};

//CREATE A SINGLE INSURANCE - /addinsurance
const createInsurance = async (req, res) => {
  const insurance = new Insurance(req.body);
  try {
    await insurance.save();
    res.status(201).json({ insurance });
  } catch (error) {
    res.status(400).json({ error: "Unable to create Insurance" });
  }
};

//GET A SINGLE INSURANCE - SHOWPAGE
const getSingleInsurance = async (req, res) => {
  try {
    const insuranceId = req.params.id;
    const insurance = await Insurance.findById(insuranceId);
    if (!insurance) {
      res.status(404).json({ error: "Insurance not found" });
    } else {
      res.json({ insurance });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

//EDIT A INSURANCE
const editInsurance = async (req, res) => {
  try {
    const insuranceId = req.params.id;
    const result = await Insurance.replaceOne({ _id: insuranceId }, req.body);
    res.json({ updatedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

//DELETE A INSURANCE
const deleteInsurance = async (req, res) => {
  try {
    const insuranceId = req.params.id;
    const result = await Insurance.deleteOne({ _id: insuranceId });
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong deleting contact" });
  }
};

module.exports = {
  getAllInsurances,
  createInsurance,
  getSingleInsurance,
  editInsurance,
  deleteInsurance,
};