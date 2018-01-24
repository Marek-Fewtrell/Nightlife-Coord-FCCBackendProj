require('dotenv').load();
const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
var jwt = require('jsonwebtoken')
var config = require('./config')
//var User = require('./models/user.js')

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
