const mongoose=require('mongoose')
const Schema=mongoose.Schema
// trk : [{
//   lat : String,
//   lng : String
//    }]
// or

// trk : { type : Array , "default" : [] }
const projectSchema= new mongoose.Schema({
    
projectname:{type:String},
teamleaderid:{type:String},
projectid:{type:String},
head:{type:String},
desc:{type:String},
teamMembersMail:{type:Array,"default":[]},
deadline:{type:String},
date:{
    type: Date,
    default:Date.now
  }
},{timestamps:true})

const ProjectSch=mongoose.model('project',projectSchema)
module.exports=ProjectSch      