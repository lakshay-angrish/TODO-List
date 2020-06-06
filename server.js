var mongoose = require('mongoose');
const express = require('express');
var bodyparser = require('body-parser')
const app = express();
const cors = require('cors');
var bodyparser = require("body-parser");
var http = require('http').createServer(app);
const ObjectID = require('mongodb').ObjectID;

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
    enum: ['running', 'expired', 'finished']
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

//this makes sure that there are no two tasks with the same title and due date
taskSchema.index({title: 1, due: 1}, { unique: true });

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

app.post('/editTask', (req, res) => {
  Task.replaceOne({
    _id: ObjectID(req.body._id)
  },
  req.body
  , (error) => {
    if (error) {
      console.log(error);
      res.send('Error while editing task. Try again.');
    } else {
      console.log('Task Updated!');
      res.send('Task Updated!');
    }
  });
});

app.put('/updateStatus', (req, res) => {
  console.log(ObjectID(req.body.id))
  Task.updateOne(
  { _id: ObjectID(req.body.id) },
  { status: "finished" }
  , (error) => {
    if (error) {
      console.log(error);
      res.send('Error while updating status. Try again.');
    } else {
      console.log('Status updated to finished!');
      res.send('Status updated to finished!');
    }
  });
});

app.put('/deleteTask', (req, res) => {
  Task.deleteOne({
    _id: ObjectID(req.body._id)
  }, (error) => {
    if (error) {
      console.log(error);
      res.send('Error while deleting task. Try again.');
    } else {
      console.log('Task Deleted!');
      res.send('Task Deleted!');
    }
  });
});

app.post('/searchTask',(req,res) => {
  var noMatch = null;

    const regex = new RegExp(escapeRegex(req.body.text), 'gi');
    Task.find({title: regex},function(err, data){
      if(err){
        console.log(err);
      }else{
        console.log(data);
        res.send(data);
      }
    })
});

http.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});

function escapeRegex(text){
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
