const { response } = require('express');
const path = require('path');
const ProjectSch = require('../Model/ProjectSchema');
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
      console.log(response);
      res.json({ message: "Task added successfully" });

    })
    .catch((error) => {
      res.json({ message: "an error occures" + error });
    });
};

const markAttendence = (req, res, next) => {
  let checkedarray = req.body.checkedarray
  let taskid = req.body.taskid
  let projectid = req.body.projectid;

  checkedarray.forEach((element) => {
    TaskSch.findOneAndUpdate({ $and: [{ 'status.email': element }, { '_id': taskid }] },
      {
        '$set': {
          'status.$.attendance': true,
        }
      }, { upsert: false, new: false },
      function (err, model) {
        console.log(model.status);
        if (err) {
          console.log(err);

          return res.send(err);
        }

      });
  })


  checkedarray.forEach((element) => {


    ProjectSch.findOneAndUpdate({ $and: [{ 'marks.memid': element }, { '_id': projectid }] },
      {

        $inc: { 'marks.$.points': 1 }
       
      },
    function(err,model)
    {
      if(model)
      {
        console.log(model)
      }
      else
      {
        console.log(err)
      }
    }
  
   ) })
}




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

const upload = (req, res, next) => {

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
    { $push: { status: { email: updateData.user, attendance: false } } },
    { new: true, upsert: true },
    function (err, managerparent) {
      if (err) throw err;
      console.log(managerparent);
    }
  );

};
module.exports = { store, show, upload, markAttendence };
