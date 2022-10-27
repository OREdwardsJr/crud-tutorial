const express = require('express');
const app = express(); // server software
const PORT = process.env.PORT || 27017;
const db = require('./db/index');
const { DestinationRoutes } = require("./routes");  
const { AuthRoutes } = require('./routes');
const bodyParser = require('body-parser'); // parser middleware
let router = express.Router();
let passport = require('passport'); // authentication
let session = require('express-session');  // session middleware
//let cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const connectEnsureLogin = require('connect-ensure-login'); //authorization
const { Authenticate } = require('./models')
var MongoStore = require('connect-mongo');


app.use(session({
  genid: function (req) {
    return uuidv4();
  },
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 },
  //store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use(express.static("public"));

// Express request handlers //
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', DestinationRoutes);
app.use('/api', AuthRoutes);

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
      res.locals.user = req.user.username;
      db.collection('destinations')
      .find().toArray()
      .then(results => {
          res.render(__dirname + '/public/index.ejs', { 
            destinations: results,
            username: req.user.username, 
            authenticated: true });
      })
      .catch(error => console.log(error));
  } else {
    res.render(__dirname + '/public/index.ejs', { destinations: [], authenticated: false});
  }
});

app.post('/api/login', passport.authenticate('local', { failureRedirect: '/failed' }), (req, res) => {
  res.redirect('/');
});

//passport.use(new LocalStrategy(Authenticate.authenticate()));
passport.use(Authenticate.createStrategy()); // allows us to not have to implement logic for finding user in table
// To use with sessions
passport.serializeUser(Authenticate.serializeUser());
passport.deserializeUser(Authenticate.deserializeUser());

//require('./routes/auth')(app, passport);
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

module.exports = router;