const ProjectSch = require("../Model/ProjectSchema");
const UserSch = require("../Model/UserSchema");

const verify = require("../verifytoken");
//shows all the users
const index = (req, res, next) => {
  ProjectSch.find({})
    .then((response) => {
      console.log(response);
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({ message: "an error occures" });
    });
};
//shows single user
const show = (req, res, next) => {
  // req.params.id
  let userId = req.params.id;
  ProjectSch.findById(userId)
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ message: "an error occures" });
    });
};
//add new user to db
const store = (req, res, next) => {
  let project = new ProjectSch({
    projectname: req.body.projectname,
    teamleaderid: req.body.teamleaderid,
    projectid: req.body.projectid,
    head: req.body.head,
    mentor: req.body.mentor,
    desc: req.body.desc,
    teamMembersMail: req.body.teamMembersMail,
    deadline: req.body.deadline,
    //photo:req.body.photo
  });
  project
    .save()
    .then((response) => {
      res.json({
        projectDetails: project,
        message: "project added successfully",
      });

      UserSch.findOneAndUpdate(
        {email: project.teamleaderid},
        { $push: { project: project._id } },
        { new: true, upsert: true },
        function (err, managerparent) {
          if (err) throw err;
          console.log(managerparent);
        }
      );
      UserSch.findOneAndUpdate(
        { email: project.mentor }, 
        { $push: { project: project._id } },
        { new: true, upsert: true },
        function (err, managerparent) {
          if (err) console.log(err);
          console.log(managerparent);
        }
      );

      // const array=[1,2,3]
      // array.
      project.teamMembersMail.forEach((memDetails) => {
        UserSch.findOneAndUpdate(
          { email: memDetails.memEmail },
          { $push: { project: project._id } },
          { new: true, upsert: true },
          function (err, managerparent) {
            if (err) console.log(err);
            console.log(managerparent);
          }
        );
      });
    })
    .catch((error) => {
      res.json({ error: { message: error.message } });
    });
};

//update an user in db
const update = (req, res, next) => {
  let userId = req.body.userId;
  let updateData = {
    teamname: req.body.teamname,
    teamleaderid: req.body.userId,
    projectid: req.body.projectid,
    head: req.body.head,
    desc: req.body.desc,
    TeamMembersMail: [req.body.mails],
    deadline: req.body.deadline,
  };
  ProjectSch.findByIdAndUpdate(userId, { $set: updateData })
    .then((response) => {
      res.json({ message: "existing user updated sucessfully" });
    })
    .catch((error) => {
      res.json({ message: "an error occures in updating" });
    });
};

//delete an user

const destroy = (req, res, next) => {
  let userId = req.body.userId;
  ProjectSch.findByIdAndRemove(userId)
    .then((response) => {
      res.json({ message: "user deleted successfully" });
    })
    .catch((error) => {
      res.json({ message: "an error occures" });
    });
};

module.exports = { index, show, store, update, destroy };
