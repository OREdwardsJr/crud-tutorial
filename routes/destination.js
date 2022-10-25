const express = require("express");
const router = express.Router();
const { createDestination, getDestinations, getDestination, deleteDestination, updateDestination } = require("./../controllers/destination-cntrl");

// create
router.post('/destination/create', createDestination);

// delete
router.delete("/destination/delete/:id", deleteDestination);

// get by id
router.get("/destination/:id", getDestination);

// get all
router.get("/destination", getDestinations);

// update
router.put("/destination/update/:id", updateDestination);

module.exports = router;