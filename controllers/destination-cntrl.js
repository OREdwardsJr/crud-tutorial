const { Destination } = require("../models"); // this is an import. it's bringing Destination from models

// CREATE DESTINATION
const createDestination = (req, res) => {
  const payload = req.body;
  if (!payload) {
    return res.status(400).json({
      success: false,
      error: "Must include destination",
    });
  }

  const destination = new Destination(payload);

  if (!destination) {
    return res.status(400).json({
      success: false,
      error: "Destination not created",
    });
  }
  
  destination
    .save()
    .then(() => {
      return res.redirect('/');
      // return res.status(201).json({
      //   success: true,
      //   id: destination._id,
      //   message: "Destination created",
      // });
    })
    .catch((e) => {
      return res.status(400).json({
        e,
        message: "Destination not created",
      });
    });
};

// GET ALL DESTINATIONS
const getDestinations = async (req, res) => {
  await Destination.find({}, (error, destination) => {
    if (error) {
      return res.status(400).json({
        error,
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: destination,
    });
  })
    .clone()
    .catch((err) => console.log(err));
};

// GET DESTINATION BY ID
const getDestination = async (req, res) => {
  await Destination.findById(req.params.id, (error, destination) => {
    if (error) {
      return res.status(400).json({
        error,
        success: fail,
      });
    }

    return res.status(200).json({
      data: destination,
      success: true,
    });
  }).catch((err) => console.log(err));
};

// DELETE DESTINATION BY ID
const deleteDestination = (req, res) => {
  Destination.deleteOne({ _id: req.params.id }, (error) => {
    if (error) {
      return res.status(400).json({
        error,
        success: true,
      });
    }

    return res.status(200).json({
      success: true,
    });
  });
  
};

// UPDATE DESTINATION BY ID
const updateDestination = (req, res) => {
  const searchKey = req.params.id;
  const payload = req.body;

  if (!payload) {
    return res.status(400).json({
      message: "Please enter desired updates",
      success: false,
    });
  }

  Destination.findByIdAndUpdate(searchKey, payload, (error) => {
    if (error) {
      return res.status(400).json({
        error,
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Payload updated."
    });
  });
};

module.exports = {
  createDestination,
  getDestinations,
  getDestination,
  deleteDestination,
  updateDestination,
};
