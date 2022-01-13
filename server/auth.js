
const UserSch=require('./Model/UserSchema')
const router=require('express').Router();
const jwt=require('jsonwebtoken');
const {registeration,login} =require('./validation');
const bcrypt=require('bcryptjs')
//register using router
router.post('/register',async(req,res)=>{

    //validating using joi
    const{error}=registeration(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    //checking if the user already exists
    const emailExist=await UserSch.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("email already exist");

    //hashing the password
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);

    const register=new UserSch({
         name:req.body.name,
        email:req.body.email, 
        password:hashPassword,
        //photo:req.body.photo

      });
    try{
        const savedUser=await register.save();
        res.send({userId:register._id});
        }catch(err){
        res.status(400).send(err)
        } 
});
    
//register using router
router.post('/login',async (req,res)=>{
        
    //validating using joi
    const{error}=login(req.body)
    if(error) return res.status(400).send(error.details[0].message)
        
    //checking if the user already exists
    const user=await UserSch.findOne({email:req.body.email});
    if(!user) return res.status(400).send("email not found");

    //checking password is correct
    const validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send("invalid password");

   // res.send({_id:user._id})

    // create and assign token
   const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
   res.header('auth-token',token).send(token);


});

        
module.exports=router;