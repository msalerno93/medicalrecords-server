const Provider = require("../Models/providerModel.js")

const getProvider = async (req, res) => {
  try {
    const result = await Provider.find();
    res.send({ providers: result });
  } catch (error) {
    res.status(500).json({ error: "There was an error that occured" });
  }
};

const createProvider = async (req, res) => {
    const provider = new Provider(req.body);
    try {
      await provider.save();
      res.status(201).json({ provider });
    } catch (error) {
      res.status(400).json({ error: "Unable to create Provider" });
    }
  };

module.exports = { getProvider, createProvider };
