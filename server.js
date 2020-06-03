var mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
var bodyparser = require("body-parser");
var http = require('http').createServer(app);

app.use(bodyparser.urlencoded( { extended: true } ));
app.use(bodyparser.json());
app.use(cors());

const dbURL = 'mongodb://localhost/todo';

mongoose.connect(dbURL, { useNewUrlParser: true });

mongoose.connection.on('connected', function(){
    console.log("Mongoose default connection is open to " + dbURL);
});

mongoose.connection.on('error', function(err){
	console.log("Mongoose default connection has occurred "+err+" error");
});

mongoose.connection.on('disconnected', function(){
	console.log("Mongoose default connection is disconnected");
});

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log("Mongoose default connection is disconnected due to application termination");
		process.exit(0)
	});
});


var taskSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1
  },
  due: Date,
  status: {
    type: String,
    enum: ['new', 'running', 'finished']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  labels: {
    type: [String],
    lowercase: true
  }
}, {
  versionKey: false
});

var Task = new mongoose.model('Task', taskSchema);

app.get('/allTasks', (req, res) => {
  Task.find((error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.post('/newTask', (req, res) => {
  var newTask = new Task({
    title: req.body.title,
    due: req.body.due,
    status: req.body.status,
    priority: req.body.priority,
    labels: req.body.labels
  });

  newTask.save((error) => {
    if (error) {
      console.log(error);
      res.send('Error while adding task. Try again.');
    } else {
      console.log('Task Added!');
      res.send('Task Added!');
    }
  });
});

http.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
