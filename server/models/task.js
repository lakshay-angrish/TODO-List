const mongoose = require("mongoose");

var taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 1,
    },
    due: Date,
    description: String,
    status: {
      type: String,
      enum: ["running", "expired", "finished"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    labels: {
      type: [String],
      lowercase: true,
      enum: ["personal", "work", "shopping", "others"],
    },
    userID: String, //every task would have a user association
  },
  {
    versionKey: false,
  }
);

//this makes sure that there are no two tasks with the same title and due date
taskSchema.index({ title: 1, due: 1 }, { unique: true });

module.exports = mongoose.model("Task", taskSchema);
