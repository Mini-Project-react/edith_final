const joi=require('@hapi/joi');

//validation
const registeration=(data)=>{
    
    const schema=joi.object({
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
});
return schema.validate(data);
}


const login=(data)=>{
    
    const schema=joi.object({
   
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
});
return schema.validate(data);
}

module.exports.registeration=registeration;
module.exports.login=login;