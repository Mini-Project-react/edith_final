const ProjectSch=require('../Model/ProjectSchema')
const verify=require('../verifytoken')
//shows all the users
const index=(req,res,next)=>{

    ProjectSch.find().then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({message:'an error occures'})
    })

}
//shows single user
const show=(req,res,next)=>{
    let userId=res.body.userId
    ProjectSch.findById(userId).then(response=>{
 
        res.json({response})
    }).catch(error=>{
        res.json({message:'an error occures'})
    })

}
//add new user to db
const store=(req,res,next)=>{
    let login=new ProjectSch({

        teamname:req.body.teamname,
       
        teamleaderid:req.body.userId,
        projectid:req.body.projectid,
        head:req.body.head,
        desc:req.body.desc,
        TeamMembersMail:[req.body.mails],
        deadline:req.body.deadline,
        //photo:req.body.photo

})
login.save().then(response=>{

    res.json({message:'employee added successfully'})
}).catch(error=>{
    res.json({message:'an error occures'})
})
}

//update an user in db
const update=(req,res,next)=>{
    let userId=req.body.userId
    let updateData={

        teamname:req.body.teamname,
        teamleaderid:req.body.userId,
        projectid:req.body.projectid,
        head:req.body.head,
        desc:req.body.desc,
        TeamMembersMail:[req.body.mails],
        deadline:req.body.deadline,

}
ProjectSch.findByIdAndUpdate(userId,{$set: updateData})
.then(response=>{

    res.json({message:'existing user updated sucessfully'})
}).catch(error=>{
    res.json({message:'an error occures in updating'})
})
}

//delete an user

const destroy=(req,res,next)=>{
    let  userId=req.body.userId
    ProjectSch.findByIdAndRemove(userId)
    .then(response=>{

    res.json({message:'user deleted successfully'})
}).catch(error=>{
    res.json({message:'an error occures'})
})
}


module.exports={index,show,store,update,destroy} 