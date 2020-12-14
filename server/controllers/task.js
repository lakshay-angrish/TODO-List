const Task = require("../models/task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userID: req.query.userID,
    }).exec();

    console.log(tasks);
    res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.addTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      due: req.body.due,
      description: req.body.description,
      userID: req.body.userID,
      status: req.body.status,
      priority: req.body.priority,
      labels: req.body.labels,
    });

    await task.save();
    console.log("Task Added!");
    res.status(200).send("Task Added!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.editTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.body._id, req.body).exec();
    console.log("Task Updated!");
    res.status(200).send("Task Updated!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.body.id, { status: "finished" }).exec();
    console.log("Status updated to finished!");
    res.status(200).send("Status updated to finished!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.body._id).exec();
    console.log("Task Deleted!");
    res.status(200).send("Task Deleted!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

exports.searchTask = async (req, res) => {
  try {
    const regex = new RegExp(escapeRegex(req.body.text), "gi");
    const tasks = await Task.find({
      $or: [{ title: regex }, { description: regex }],
      userID: req.body.userID,
    }).exec();

    if (Object.keys(tasks).length == 0) {
      rdata = { sdata: tasks, status: false };
    } else {
      rdata = { sdata: tasks, status: true };
    }
    console.log("Tasks Fetched");
    res.status(200).send(rdata);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.searchTaskFil = async (req, res) => {
  try {
    var rdata = {};
    const regex = new RegExp(escapeRegex(req.body.text), "gi");

    const tasks = await Task.find({
      $or: [{ title: regex }, { description: regex }],
      userID: req.body.userID,
      labels: { $in: req.body.Labarr },
      priority: { $in: req.body.Priarr },
    }).exec();

    if (Object.keys(tasks).length == 0) {
      rdata = { sdata: tasks, status: false };
    } else {
      rdata = { sdata: tasks, status: true };
    }

    console.log("Tasks Fetched");
    res.status(200).send(rdata);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};
