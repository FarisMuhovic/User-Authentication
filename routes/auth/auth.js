const {Router} = require("express");
const router = Router();

const {hashPassword, comparePassword} = require("../../utils/passwordHasher");
const User = require("../../database/schemas/User");

router.post("/auth/register", async (req, res) => {
  let {username, email, password} = req.body;
  const UserDB = await User.findOne({$or: [{username}, {email}]});
  if (UserDB) {
    return res.status(400).json({message: "User already exists"});
  } else {
    password = hashPassword(password);
    const user = await User.create({
      username,
      password,
      email,
    });
    req.session.userID = user.id;
    return res.status(200).json({message: "User created"});
  }
});

router.post("/auth/login", async (req, res) => {
  let {email, password} = req.body;
  const UserDB = await User.findOne({email});
  if (UserDB) {
    const isPasswordCorrect = comparePassword(password, UserDB.password);
    req.session.userID = UserDB.id;
    isPasswordCorrect
      ? res.status(200).json({message: "User logged in"})
      : res.status(400).json({message: "Wrong password"});
  }
});
// * Session checkers
// make a middleware to check if user is logged in when switching pages / routes / refresh
router.get("/auth/login", async (req, res) => {
  console.log(req.session.userID);
  if (req.session.userID) {
    if (await User.findById(req.session.userID)) {
      const userData = await User.findById(req.session.userID);
      return res
        .status(200)
        .json({message: "User is logged in", username: userData.username});
    } else {
      return res.status(400).json({message: "User is not logged in"});
    }
  } else {
    console.log("User is not logged in");
    return res.status(400).json({message: "User is not logged in"});
  }
});

module.exports = router;
