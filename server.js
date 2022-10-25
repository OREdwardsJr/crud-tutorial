const express = require('express');
const app = express();
const PORT = process.env.PORT || 42373;
const db = require('./db');
const { DestinationRoutes } = require("./routes");
const bodyParser = require('body-parser');

// Express request handlers //
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', DestinationRoutes);
app.use(express.static("public"));

app.get('/', (req, res) => {
     db.collection('wishlists')
     .find().toArray()
     .then(results => {
        res.render(__dirname + '/public/index.ejs', { wishlists: results });
    })
     .catch(error => console.log(error));
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));