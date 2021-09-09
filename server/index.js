require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// use session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true}); // connect to databse

// create a schema for a user in the database
userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    secret: String
  });

// plugin packages for more functionality
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// create user model from the user schema
const User = new mongoose.model("User", userSchema);

// setup passport-local LocalStrategy with the correct options.
passport.use(User.createStrategy());

// methods to serialize and deserialize user
passport.serializeUser(function(user, done) {
    done(null, user);
});
   
  passport.deserializeUser(function(user, done) {
    done(null, user);
});

// for google Oauth
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/secrets", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
});

app.route("/login")

.post(function(req, res)
{
  const user = new User({
    username: req.body.username,
    password:req.body.password
  });

  req.login(user, function(err)
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      passport.authenticate("local")(req, res, function()
      {
        res.redirect("/");
      });
    }
  });
});


// REGISTER
app.route("/register")

.post(function(req, res)
{
  User.register({username: req.body.username}, req.body.password, function(err, user)
  {
    if(err)
    {
      console.log(err);
      res.redirect("/register");
    }
    else
    {
      passport.authenticate("local")(req, res, function()
      {
        res.redirect("/");
      });
    }
  });
});

app.route("/logout")
.get(function(req, res)
{
  req.logout();
  res.redirect("/");
});

app.route('/account-details')
.get((req, res) => {

    res.json({ contents: {
        id: 17,
        accountName: 'Example Account Name'
    } })
})

// app.route('/search/:query')
// .get((req, res) => {
//     let query = req.params.query;

    
// })


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})