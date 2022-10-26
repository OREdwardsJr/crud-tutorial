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
let router = express.Router();
let passport = require('passport');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let userRoutes = require('./routes/user');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

router.get('/login', function(req, res, next) {
  res.render('login');
});

app.use('/api/user', userRoutes);

app.use(passport.authenticate('session'));

module.exports = router;