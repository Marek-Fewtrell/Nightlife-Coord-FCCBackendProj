require('dotenv').load();
const express = require('express')
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, '/public')))
app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'));

//---------------------------------------------------------


app.get('/', function(req, res, next) {
  res.sendFile(process.cwd() + '/index.html')
})
app.get('/test', function(req, res, next) {
  res.send("this works")
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
