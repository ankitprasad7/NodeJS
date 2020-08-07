const usersModel = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;


const password = (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      return res.send(401, err);
    }
    delete req.body.password;
    req.body.password = hash;
    next();
  });
};
function session(req, res, next) {
    /*if(!req.session.user){
      return res.status(401).send("login first");
      }
      res.status(200).send(req.session.user)
      */
      try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      var decoded = jwt.verify(token, "shhhhh");
      console.log(decoded._doc);
      next();
    } catch (err) {
      res.status(401).send("invalid token");
    }
  }
function validate(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) {
    return res.send("enter email or password");
  }
  next();
}

module.exports = {
  password,
  session,
  validate,
};
