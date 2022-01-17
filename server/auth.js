const UserSch = require("./Model/UserSchema");

router = require("express").Router();
const jwt = require("jsonwebtoken");
const { registeration, login } = require("./validation");
const bcrypt = require("bcryptjs");
//register using router
router.post("/register", async (req, res) => {
  //validating using joi
  const { error } = registeration(req.body);
  if (error) return res.json({ error: { message: error.details[0].message } });

  //checking if the user already exists
  const emailExist = await UserSch.findOne({ email: req.body.email });
  if (emailExist)
    return res.send({ error: { message: "isEmailAlreadyExits" } });

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const register = new UserSch({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    //photo:req.body.photo
  });
  try {
    const savedUser = await register.save();
    res.send({ userId: register._id });
  } catch (err) {
    res.status(400).json({ error: { message: err } });
  }
});

//register using router
router.post("/login", async (req, res) => {
  //validating using joi
  const { error } = login(req.body);
  if (error) return res.send({ error: { message: error.details[0].message } });

  //checking if the user already exists
  const user = await UserSch.findOne({ email: req.body.email });
  if (!user) return res.send({ error: { message: "email not found" } });

  //checking password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send({ error: { message: "invalid password" } });

  // create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res.header({ "auth-token": token }).send({
    token,
    userId: user._id,
    displayName: user.name,
    project: user.project,
  });
});

module.exports = router;
