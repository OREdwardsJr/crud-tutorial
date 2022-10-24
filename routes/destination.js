const express = require("express");
const router = express.Router();
const { Destination } = require("./../models");
const { createDestination, getDestinations, getDestination, deleteDestination, updateDestination } = require("./../controllers/destination-cntrl");
const herokuLine = 'vacation-wishlist.herokuapp.com'

// create
//router.post('/destination/create', createDestination);
router.post(herokuLine = '/destination/create', createDestination);

// delete
//router.delete("/destination/delete/:id", deleteDestination);
router.delete(herokuLine + "/destination/delete/:id", deleteDestination);

// get by id
//router.get("/destination/:id", getDestination);
router.get(herokuLine + "/destination/:id", getDestination);

// get all
//router.get("/destination", getDestinations);
router.get(herokuLine + "/destination", getDestinations);

// update
//router.put("/destination/update/:id", updateDestination);
router.put(herokuLine + "/destination/update/:id", updateDestination);

module.exports = router;