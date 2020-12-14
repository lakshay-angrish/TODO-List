const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const ObjectID = require("mongodb").ObjectID;
const userRouter = require("./server/routers/user");
const taskRouter = require("./server/routers/task");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const dbURL = "mongodb://localhost/todo";

mongoose.connect(
  dbURL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("mongodb connected")
);

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error")
);

app.use(taskRouter);
app.use(userRouter);

http.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
