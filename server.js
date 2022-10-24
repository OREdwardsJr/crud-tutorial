/* 
TODO
    REFACTOR MAIN.JS TO FIT DATABASE
    POSSIBLY IMPLEMENT A USER DB FOR LOGGING IN AND SAVING WISHLISTS
    IMPLEMENT OTHER FUNCTIONS (UPDATE, DELETE, ETC..)
    RENDER EJS
*/ 

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
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
//app.set('views', __dirname +  "/public");

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    db.collection('wishlists')
    .find()
    .toArray()
    .then(results => res.send(results))
    .catch(e => console.error("We have an error: ", e));
});


/* TODO
RES.SENDFILE AND RES.RENDER ARE SENDING MULTIPLE REQUESTS. 
MAYBE LOOK INTO HOW TO STOP RES.SENDFILE BEFORE CONTINUING
*/
// app.get('/', (req, res) => {
//      db.collection('wishlists')
//      .find().toArray()
//      .then(results => {
//         res.render(__dirname + '/public/index.ejs', { wishlists: results });
//     })
//      .catch(error => console.log(error));
// });

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));




/*
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://oredwardsjr:9in4qM6GiDnyJUW9@cluster0.ua6g7as.mongodb.net/?retryWrites=true&w=majority";
const { DestinationRoutes } = require("./routes");
app.use(express.static("public"));
app.set('view engine', 'ejs')


let db;
let wishlistCollection;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
     .then(client => {
        console.log('Connected to Database')

        db = client.db('wishlist-entries');
        wishlistCollection = db.collection('wishlists');
     })
     .catch(error => console.log(error))

    
    // express request handlers
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', DestinationRoutes);

    app.get('/', (req, res) => {
        res.sendFile(__dirname + "/public/index.html");

        db.collection('wishlists').find().toArray()
         .then(results => {
             console.log(results);
             res.render(__dirname + 'views/index.ejs', { wishlists: results });
        })
         .catch(error => console.log(error));
    });

    app.post('/', (req, res) => {
        wishlistCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/');
                console.log(result);
            })
            .catch(error => console.error(error));
    });

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`)
    });
    */