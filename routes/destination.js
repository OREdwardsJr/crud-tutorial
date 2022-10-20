const express = require("express");
const router = express.Router();
const { Destination } = require("./../models");


// create
router.post('/destination/create', (req, res) => {
    //res.send("Route for creating")
    // capture payload (grab request body)
    const payload = req.body;
    console.log(payload);

    // check if payload has data
    if (!payload) {
        return res.status(400).json({
            success: false,
            error: "Must enter a destination"
        });
    };

    // create a new instance
    const destination = new Destination(payload);

    // check if instance was created
    // if not send status and a message
    if (!destination) {
        return res.status(400).json({
            success: false,
            error: "Must enter a destination"
        });
    };
    
    // save instance
    destination.save().then(() => { // look up mongoose save method
        // return some data
        return res.status(201).json({
            success: true,
            message: "Destination saved and created"
        });
    });
})

// delete
router.delete("/destination/delete/:id", (req, res) => res.send(`Route for deleteing id: ${req.params.id}`));

// get by id
router.get("/destination/:id", (req, res) => res.send(`Route for getting id: ${req.params.id}`));

// get all
router.get("/destination", (req, res) => res.send("Route for getting all"));

// update
router.put("/destination/update/:id", (req, res) => res.send(`Route for updating id: ${req.params.id}`));

module.exports = router;
