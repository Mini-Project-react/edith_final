const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");
const UserController = require("./Controller/UserController");
const ProjectController = require("./Controller/ProjectController");
const TaskController = require("./Controller/TaskController");
const authRoute = require("./auth.js");

const dotenv = require("dotenv");
const verifytoken = require("./verifytoken");
const fileUpload = require('express-fileupload');
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log(" database connection established");
  app.listen(5000);
});

const app = express();
// middleWares
console.log(__dirname);
app.use(fileUpload());

app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors({ exposedHeaders: "auth-token" }));
app.use("/api/users", authRoute);
// app.get('/',homepage)
app.get("/api/users/index", UserController.getAllUser);
app.get("/api/users/:id", UserController.getSingleUser);
app.post("/api/users/store", UserController.store);
app.post("/api/users/update", UserController.update);
app.post("/api/users/delete", UserController.destroy);
app.get("/api/projects", ProjectController.index);
app.get("/api/projects/show/:id", ProjectController.show);
app.post("/api/projects/store", ProjectController.store);
app.post("/api/projects/update", ProjectController.update);
app.post("/api/projects/delete", ProjectController.destroy);
app.post("/api/tasks/store",TaskController.store);
app.post("/api/tasks/upload",TaskController.upload);
app.get("/api/tasks/show/:id",TaskController.show)
app.get("/api/auth/post", verifytoken, (req, res) => {
  res.json({
    exclusive: "yes it is ",
  });
});

app.use('/uploads', express.static('uploads'));
