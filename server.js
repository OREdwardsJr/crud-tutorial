/* 
TODO
    REFACTOR MAIN.JS TO FIT DATABASE
    POSSIBLY IMPLEMENT A USER DB FOR LOGGING IN AND SAVING WISHLISTS
    IMPLEMENT OTHER FUNCTIONS (UPDATE, DELETE, ETC..)
    RENDER EJS
*/ 

const express = require('express');
const app = express();
const PORT = process.env.PORT || 42373;
const db = require('./db');
const { DestinationRoutes } = require("./routes");
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');

// express request handlers //
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use('/api', DestinationRoutes);
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
     db.collection('wishlists')
     .find().toArray()
     .then(results => {
        res.render(__dirname + '/public/index.ejs', { wishlists: results });
    })
     .catch(error => console.log(error));
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));