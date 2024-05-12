const Provider = require("../Models/providerModel.js");

//GET ALL PROVIDERS - /providers
const getAllProviders = async (req, res) => {
  try {
    const result = await Provider.find();
    res.send({ providers: result });
  } catch (error) {
    res.status(500).json({ error: "There was an error that occured" });
  }
};

//CREATE A SINGLE PROVIDER - /addprovider
const createProvider = async (req, res) => {
  const provider = new Provider(req.body);
  try {
    await provider.save();
    res.status(201).json({ provider });
  } catch (error) {
    res.status(400).json({ error: "Unable to create Provider" });
  }
};

//GET A SINGLE PROVIDER - SHOWPAGE
const getSingleProvider = async (req, res) => {
  try {
    const providerId = req.params.id;
    const provider = await Provider.findById(providerId);
    if (!provider) {
      res.status(404).json({ error: "Provider not found" });
    } else {
      res.json({ provider });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

//EDIT A PROVIDER
const editProvider = async (req, res) => {
  try {
    const providerId = req.params.id;
    const result = await Provider.replaceOne({ _id: providerId }, req.body);
    res.json({ updatedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

//DELETE A PROVIDER
const deleteProvider = async (req, res) => {
  try {
    const providerId = req.params.id;
    const result = await Provider.deleteOne({ _id: providerId });
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong deleting contact" });
  }
};

module.exports = {
  getAllProviders,
  createProvider,
  getSingleProvider,
  editProvider,
  deleteProvider,
};
