const mongoose=require('mongoose')
const Schema=mongoose.Schema

const projectSchema= new mongoose.Schema({
    
teamname:{type:String},
teamleaderid:{type:String},
projectid:{type:String},
head:{type:String},
desc:{type:String},
TeamMembersMail:[{type:String}],
deadline:{type:String}
},{timestamps:true})

const ProjectSch=mongoose.model('project',projectSchema)
module.exports=ProjectSch      