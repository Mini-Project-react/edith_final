const { response } = require('express');
const path = require('path')
const TaskSch = require("../Model/TaskSchema");
const error = (message) => ({ error: { message } });
const store = (req, res, next) => {
  let task = new TaskSch({
    taskname: req.body.taskname,
    desc: req.body.desc,
    deadline: req.body.deadline,
    projectid: req.body.projectid,

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
  TaskSch.find({ projectid })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ message: "an error occures" });
    });
};

const upload =  (req, res, next) => {

  let updateData = {
    link: req.body.link,
    file: req.body.filename,
    user: req.body.teammember,
    taskid: req.body.taskid,
    date: req.body.date,
    time: req.body.time,

  };
  if (req.files) {
    const file = req.files.file;
    const folderpath = path.resolve("./");
    console.log(folderpath)
    file.mv(`${folderpath}\\uploads\\${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    }
    );
  }
  TaskSch.findOneAndUpdate(
    { _id: updateData.taskid },
    { $push: { Submissions: updateData } },
    { new: true, upsert: true },
    function (err, managerparent) {
      if (err) throw err;
      console.log(managerparent);
    }
  );
  TaskSch.findOneAndUpdate(
    { _id: updateData.taskid },
    { $push: { status: updateData.user } },
    { new: true, upsert: true },
    function (err, managerparent) {
      if (err) throw err;
      console.log(managerparent);
    }
  );

};
module.exports = { store, show, upload };
