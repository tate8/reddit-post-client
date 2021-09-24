require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require('connect-flash');
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require("mongoose-findorcreate");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(flash());


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
    fullName: String,
    username: { type: String, unique: true },
    password: { type: String },
    googleId: String,
    facebookId: String,
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
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/home",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get( '/auth/google/home',
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/login'
}));

// Facebook Oauth
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/home"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ facebookId: profile.id }, function(err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
}
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/home',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.post('/login',
  passport.authenticate('local', { 
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true 
    }),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log('facebook auth sucess')
  });
  
// app.route("/login")

// .post(function(req, res)
// {  
//   const user = new User({
//     fullName: 't',
//     username: req.body.username,
//     password:req.body.password
//   });
//   // WHY MAKING USER INSTEAD OF SEARCHING FOR THEM???? 
//   req.login(user, function(err)
//   {
//     if(err)
//     {
//       console.log(err);
//     }
//     else
//     {
//       passport.authenticate("local", { failureFlash: true })(req, res, function()
//       {
//         res.redirect("/");
//       });
//     }
//   });
// });


// REGISTER
app.route("/register")

.post(function(req, res)
{
  User.register({fullName: req.body.fullName, username: req.body.username}, req.body.password, function(err, user)
  {
    if(err)
    {
      console.log(err);
      res.redirect("/register");
    }
    else
    {
      passport.authenticate("local", { failureRedirect: '/register', failureFlash: true })(req, res, function()
      {
        res.redirect("/");
      });
    }
  });
});

// app.post('/change-password',
//  (req, res) => {
//    if (req.isAuthenticated())
//    {
//       user.changePassword(req.body.oldPassword, req.body.newPassword, (err) => {
//       console.log(err)
//     })
//    }
// })

app.post('/change-password', (req, res) => {
  User.findOne({ username: req.user.username }, (err, user) => {
    if (err) {
      console.log(err)
      
    }
    else
    {
      user.changePassword(req.body.oldPassword, req.body.newPassword).then(() => {
        res.redirect('/user')
      }).catch((err) => {
        flash("Password is incorrect")
      })
    }
  })

});

app.route('/logged-in')
.get((req, res) => {
  if (req.user)
  {
    res.json({ loggedIn: true });
  }
  else
  {
    res.json({ loggedIn: false });
  }
})


app.route("/logout")
.get(function(req, res)
{
  req.logout();
  res.redirect("/");
});

app.route('/account-details')
.get((req, res) => {
  if (req.user)
  {
    res.json({ contents: {
        email: req.user.username,
        accountName: req.user.fullName
    } })
  }
})


// app.route('/search/:query')
// .get((req, res) => {
//     let query = req.params.query;

    
// })


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})