const express = require('express');
const app = express();
const PORT = process.env.PORT || 12907;
const db = require('./db');
const { DestinationRoutes } = require("./routes");
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    db.collection('destinations')
    .find()
    .toArray()
    .then(results => res.send(results))
    .catch(e => console.error("We have an error: ", e));
});

app.use('/api', DestinationRoutes);

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));