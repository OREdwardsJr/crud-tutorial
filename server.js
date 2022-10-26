const express = require('express');
const app = express();
const PORT = process.env.PORT || 42373;
const db = require('./db/index');
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

// PASSWORD.JS features
var router = express.Router();

var authIndexRouter = require('./routes/signin');
var authRouter = require('./routes/auth');

var passport = require('passport');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

router.get('/login', function(req, res, next) {
  res.render('login');
});

app.use('/', authIndexRouter);
app.use('/', authRouter);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));

//app.use(passport.authenticate('session'));

module.exports = router;