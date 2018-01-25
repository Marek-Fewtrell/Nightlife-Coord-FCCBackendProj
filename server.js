require('dotenv').load();
const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
var jwt = require('jsonwebtoken')
var config = require('./config')
var User = require('./user.js')
var Attendance = require('./attendance.js')

mongoose.connect(config.database)
app.set('superSecret', config.secret)

app.use(express.static(path.join(__dirname, '/public')))
app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//---------------------------------------------------------


app.get('/', function(req, res, next) {
  res.sendFile('/public/index.html')
})
app.get('/test', function(req, res, next) {
  res.send("this works")
})

//########

app.post('/authenticate', function(req, res, next) {
  //console.log(req.body.loginCredentials)
  console.log("Authenticating user. /authenticate")
  User.findOne({
    username: req.body.loginCredentials.username
  }, function(err, user) {
    if (err) throw err

    if (!user) {
      res.json({success: false, message: 'Authenticationg Failed. User not found.'})
      /*const payload = {
        admin: true
      };
      var token = jwt.sign(payload, app.get('superSecret'), {

      });
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });*/
    } else if (user) {
      // check if password matches
      if (user.password != req.body.loginCredentials.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          userId: user._id
        };
        var token = jwt.sign(payload, app.get('superSecret')/*, {
          expiresInMinutes: 1440 // expires in 24 hours
        }*/);

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }
  })
})

app.post('/register', function(req, res, next) {
  console.log("Registering user. /register")
  console.log(req.body.registerCredentials)

  var person = new User({
    username: req.body.registerCredentials.username,
    password: req.body.registerCredentials.password,
    admin: true
  })

  person.save(function(err) {
    if (err) throw err

    console.log('User saved successfully')
    res.json({success: true})
  })

})

//#######

app.get('/api/places', function(req, res, next) {
  console.log("Got request for places.")
  var places = [
    {
      id: 1,
      name: 'Place 1',
      description: 'Description 1',
      going: false
    },
    {
      id: 2,
      name: 'Place 2',
      description: 'Description 2',
      going: false
    },
    {
      id: 3,
      name: 'Place 3',
      description: 'Description 3',
      going: false
    }
  ]
  res.send(places)
})

//#######

app.put('/api/attendance', function(req, res, next) {
  console.log(req.body)
  console.log("Got request for attendance.")
  return
  var attending = new Attendance({
    userId: 1, //TODO replace this with token stuff.
    placeId: req.body.placeId,
    attend: req.body.userAttendance
  })

  attending.save(function(err) {
    if (err) throw err

    console.log('Attendance saved successfully')
    res.json({success: true})
  })
})


//---------------------------------------------------------


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.send('error', {err: err});
  res.send('error here');
});

app.listen(process.env.PORT || 23200, ()=> console.log("app listenting on port 23200."))
