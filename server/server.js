const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");
const UserController = require("./Controller/UserController");
const ProjectController = require("./Controller/ProjectController");

// const homepage=require('./')
mongoose.connect("mongodb://localhost:27017/edith", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//mongoose.connect('mongodb+srv://edith:19csr@mini.sip3x.mongodb.net/edith?retryWrites=true&w=majority')
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log(" database connection established");
});

const app = express();
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.listen(5000);
// app.get('/',homepage)
app.get("/api/users/index", UserController.index);
app.get("/api/users/show", UserController.show);
app.post("/api/users/store", UserController.store);
app.post("/api/users/update", UserController.update);
app.post("/api/users/delete", UserController.destroy);
app.get("/api/projects/index", ProjectController.index);
app.post("/api/projects/show", ProjectController.show);
app.post("/api/projects/store", ProjectController.store);
app.post("/api/projects/update", ProjectController.update);
app.post("/api/projects/delete", ProjectController.destroy);


app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});