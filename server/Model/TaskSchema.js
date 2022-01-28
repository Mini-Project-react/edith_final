const { string, array } = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new mongoose.Schema(
    {
      taskname: { type: String },
      projectid: { type: String },
      desc: { type: String },
      Submissions: { type: Array, default: [] },
      status:{type:Array, unique:true},
      deadline: { type: String },
      date: {
        type: Date,
        default: Date.now,
      },
    },
   
    { timestamps: true }
  );
  
  const TaskSch = mongoose.model("Task", TaskSchema);
  module.exports = TaskSch;