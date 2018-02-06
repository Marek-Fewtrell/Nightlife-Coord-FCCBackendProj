require('dotenv').load();
const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const serveStatic = require('serve-static')

const app = express()
var jwt = require('jsonwebtoken')
var config = require('./config')
var User = require('./user.js')
var Attendance = require('./attendance.js')

mongoose.connect(config.database)
app.set('superSecret', config.secret)

// Previous vuejs stuff in public folder
//app.use(express.static(path.join(__dirname, '/public')))
//app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'));
app.use("/", serveStatic ( path.join (__dirname, '/web-app/dist') ) )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

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

function resultData(success, message, others = null) {
  var returnData = {
    success: success,
    message: message
  }
  if (others !== null) {
    if (others.hasOwnProperty('places')) {
      returnData['places'] = others.places
    }
    if (others.hasOwnProperty('authenticate')) {
      returnData['authenticate'] = others.authenticate
    }
    if (others.hasOwnProperty('token')) {
      returnData['token'] = others.token
    }
  }

  return returnData
}


//---------------------------------------------------------


/*app.get('/', function(req, res, next) {
  res.sendFile('/public/index.html')
})*/
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
      res.json(resultData(false, 'Authenticationg Failed. Wrong password/username.'))
    } else if (user) {
      // check if password matches
      if (user.password != req.body.loginCredentials.password) {
        res.json(resultData(false, 'Authentication failed. Wrong password/username.', null))
      } else {

        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          userId: user._id
        };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: '24h' // expires in 24 hours
        });

        // return the information including token as JSON
        res.json(resultData(true, 'Login Successfull', {token: token}))
        /*res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });*/
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
    res.json(resultData(true, 'Register Successfull.', null))
    //res.json({success: true})
  })

})

//#######

app.use(function(req,res,next) {
  console.log("in token management middleware function.")
  var token = null
  if (req.headers['authorization']) {
    //var token = req.body.token || req.query.token || header
    token = req.headers['authorization'].split(' ')[1]
  }

  req.userToken = {
    present: false,
    decoded: null,
    error: false
  }
  if (token) {
    console.log("Token present. Verifying token.")
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        console.log("Error in verifying token")
        if (err.name != 'TokenExpiredError') {
          console.log(err)
        }
        req.userToken.error = err
        //req.userToken.present = false
      } else {
        console.log("Token correctly verified.")
        // if everything is good, save to request for use in other routes
        req.userToken.present = true
        req.userToken.decoded = decoded;
      }
    });
  } else {
    console.log("No token provided.")
    // if there is no token
    //req.userToken.present = false
  }
  next()
})

//#######

app.get('/api/places',
  function (req, res, next) {
    //console.log(req.headers)
    //console.log("Got request for places.")
    if (req.userToken && req.userToken.present === true) {
      console.log("Authorized access")
      next('route')
    } else {
      console.log("Not authorized access")
      next()
    }
  },
  function(req, res, next) {
    console.log("This should be the normal unauthorised route.")
    var returnData = resultData(true, 'Got some places.', {places: places})
    if (req.userToken.error.hasOwnProperty['name'] && req.userToken.error.name === 'TokenExpiredError') {
      returnData = resultData(true, 'Got some places.', {places: places, token: false})
    }
    return res.json(returnData)
    //return res.send({success: true, message: 'Got some places', places: places})
  }
)

app.get('/api/places', function (req, res, next) {
  console.log('This should be the authorised route.')
  console.log("decoded userId:" + req.userToken.decoded)
  Attendance.find({userId: req.userToken.decoded.userId}, function(err, result) {
    if (err) throw err

    if (!result) {
      console.log("result doesn't exist.")
      //res.json({success: false, message: 'Authenticationg Failed. User not found.'})
      //res.send(places)
      res.json(resultData(true, 'Got some places.', {places: places}))
    } else if (result) {
      console.log('Results exists')
      console.log(result)
      for (var i = 0; i < places.length; i++) {
        for (var k = 0; k < result.length; k++) {
          if (places[i].id == result[k].placeId) {
            console.log("found match")
            places[i].going = result[k].attend
          }
        }
      }
      console.log(places)
    }
  })

  //res.send(places)
  res.json(resultData(true, 'Got some places.', {places: places}))
})

//#######

app.use(function(req,res,next) {
  console.log("in middleware function.")
  console.log(req.userToken)
  if (req.userToken.error) {
    console.log("Error with auth and token.")
  } else if (req.userToken && req.userToken.present === true) {
    //console.log(req.userToken.decoded)
    console.log("Token present.")
    return next()
  } else {
    console.log("Token not found.")
    // if there is no token
    // return an error
  }
  return res.json(resultData(false, 'You don\'t have authorisation.', {authenticate: false, token: false}))
  //return res.json({success: false, message: 'You don\'t have authorisation.'})

})

app.put('/api/attendance', function(req, res, next) {
  console.log("Got request for attendance.")
  console.log(req.userToken.decoded)

  Attendance.findOne({
      userId: req.userToken.decoded.userId,
      placeId: req.body.placeId
    }, function(err, result) {
      if (err) throw err

      if (!result) {
        console.log("result doesn't exist.")
        //res.json({success: false, message: 'Authenticationg Failed. User not found.'})
        var attending = new Attendance({
          userId: req.userToken.decoded.userId, //TODO replace this with token stuff.
          placeId: req.body.placeId,
          attend: req.body.userAttendance
        })

        attending.save( function(err) {
          if (err) throw err

          console.log('Attendance saved successfully')
          //return res.json({success: true})
          return res.json(resultData(true, 'Attendance saved successfully'))
        })
      } else if (result) {
        console.log('Result exists')
        console.log(result)
        //return deleteAttendanceApi(Attendance, result, res)
        Attendance.deleteOne({
          _id: result._id
        }, function(err) {
          if (err) throw err
          console.log("Deleted single attendance.")
          //return res.send({success: true, message: 'Attendance successfully removed.'})
          return res.json(resultData(true, 'Attendance successfully removed.'))
        })
      }
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
