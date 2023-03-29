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
      password: hashPassword(password),
      email,
    });
    req.session.cookie.userId = user.id;
    console.log(req.session);
    // return res.status(200).json({message: "User created"});
  }
});
router.get("/auth/login", async (req, res) => {
  console.log(req.session);
  if (req.session.userId) {
    console.log("User is logged in");
    return res.status(200).json({message: "User is logged in"});
  } else {
    console.log("User is not logged in");
    return res.status(400).json({message: "User is not logged in"});
  }
});
module.exports = router;
