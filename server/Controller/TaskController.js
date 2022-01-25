const TaskSch = require("../Model/TaskSchema");
const error = (message) => ({ error: { message } });
const store = (req, res, next) => {
    var date = new Date(dateStr);  // dateStr you get from mongodb

    var d = date.getDate();
    var m = date.getMonth()+1;
    var y=date.getFullYear();
    let task = new TaskSch({
      taskname: req.body.taskname,
      desc:req.body.desc,
      deadline:req.body.deadline,
      projectid:req.body.projectid,
     
// ...
      //photo:req.body.photo
    });
  
    task
      .save()
      .then((response) => {
        res.json({ message: "Task added successfully" });
      })
      .catch((error) => {
        res.json({ message: "an error occures" });
      });
  };
  const show = (req, res, next) => {
    // req.params.id
    let projectid = req.params.id;
    TaskSch.find({projectid})
      .then((response) => {
        res.json({ response });
        
      })
      .catch((error) => {
        res.json({ message: "an error occures" });
      });
  };
  module.exports = { store,show };