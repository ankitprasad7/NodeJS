const userModel = require("../Models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

async function checkUserExists(value) {
  const user=userModel.find({ email: value }, (err, data) => {
    if (err) {
      return res.status(401, err);
    }
    return user.length;
  });
}
function passCheck(userpassword, dbpassword) {
  var comparepass = bcrypt.compare(userpassword, dbpassword);
  return comparepass;
}

function registerUser(req, res, next) {
  let user = req.body;
  const newUser = new userModel(user);
  newUser.save((err) => {
    if (err) {
      return res.status(401, err);
    }
    res.status(200).send(user);
  });
}
function login() {
  return async function (req, res, next) {
    const email = req.body.email;
    const pass = req.body.password;
   const userExists = await checkUserExists(email);
    if (!userExists) {
      return res.send(404, { message: "Email address not found" });
    }
    const user = await userModel.findOne({ email: email }, (err, data) => {
      if (err) {
        return res.status(401, err);
      }
    });
    var comparepass = await passCheck(req.body.password, user.password).catch(
      (err) => {
        if (err) {
          return res.send(500);
        }
      }
    );
    if (comparepass) {
      //req.session.save();
      //req.session.userId = user.id;

      var exp = "60s";
      var token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        "shhhhh",
        { expiresIn: exp }
      );
      res.send(200, {
        message: "Successfully Login",
        Access_Token: token,
      });
    } else {
      res.send(401, {
        message: "Invalid Password",
      });
    }
  };
}

function updateUser() {
  return async function (req, res, next) {
    const userId = req.params.id;
    let user = req.body;
    await userModel.findByIdAndUpdate(userId, user, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send("updated");
    });
  };
}

function deleteUser() {
  return async function (req, res, next) {
    const userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    res.status(201).send({ message: "User deleted" });
  };
}

module.exports = {
  registerUser,
  login,
  updateUser,
  deleteUser,
};
