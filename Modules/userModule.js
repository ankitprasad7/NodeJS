const userModel = require("../Models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");



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

    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(404, { message: "user not found" });
    bcrypt.compare(pass, user.password, function (err, result) {
      if (err) {
        res.send(404, "incomplete data");
      }
      if (result == false) {
        return res.send("invalid credentials");
      } else {
        var token = jwt.sign({ ...user, _id: user._id.toString() }, "shhhhh", {
          expiresIn: "100000ms",
        });
        console.log(user._id);
        return res.status(200).send({ message: "User has logged in ", token: token });
      }
    });
  };
}
async function showUser(req, res) {
  let user = req.body;
  const userId = req.params.id;
  const response = await userModel.findById(userId, user);
  if (!response) {
      res.send(404, "user not found");
  }
   //req.session.user = response;
   res.status(200).send(response);

}
function updateUser() {
  return async function (req, res, next) {
    const userId = req.params.id;
    let user = req.body;
    const response=await userModel.findByIdAndUpdate(userId, user, (err, data) => {
      if (err) {
        console.log(err);
        res.status(404,{message:'user not found'});
      }
       //req.session.user = response;
      res.status(200).send(data);
    });
  };
}

function deleteUser() {
  return async function (req, res, next) {
    const userId = req.params.id;
    const response=await userModel.findByIdAndDelete(userId);
     //req.session.user = response;
     res.status(201).send({ message: "User deleted" });
  };
}

module.exports = {
  registerUser,
  login,
  updateUser,
  deleteUser,
showUser
};
