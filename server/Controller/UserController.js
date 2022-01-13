const UserSch=require('../Model/UserSchema')




//shows all the users
const index=(req,res,next)=>{

    UserSch.find().then(response=>{
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
    UserSch.findById(userId).then(response=>{

        res.json({response})
    }).catch(error=>{
        res.json({message:'an error occures'})
    })

}
//add new user to db
const store=(req,res,next)=>{
    let login=new UserSch({

        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        //photo:req.body.photo

})

login.save().then(response=>{

    res.json({message:'user added successfully'})
}).catch(error=>{
    res.json({message:'an error occures'})
})
}

//update an user in db
const update=(req,res,next)=>{
    let userId=req.body.userId
    let updateData={

        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone

}
UserSch.findByIdAndUpdate(userId,{$set: updateData})
.then(response=>{

    res.json({message:'existing user updated sucessfully'})
}).catch(error=>{
    res.json({message:'an error occures in updating'})
})
}

//delete an user

const destroy=(req,res,next)=>{
    let  userId=req.body.userId
    UserSch.findByIdAndRemove(userId)
    .then(response=>{

    res.json({message:'user deleted successfully'})
}).catch(error=>{
    res.json({message:'an error occures'})
})
}


module.exports={index,show,store,update,destroy} 