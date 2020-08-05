const Users = require("../Models/user");

async function checkUserExists(field, value) {
  const users = await Users.find({ [field]: value }).exec();
  console.log("Users::", users);
  return users.length;
}

function getUsers(req, res, next) {
  const query = req.query.query;
  const size = req.query.size || 10;

  Users.find(query, function (err, users) {
    if (err) {
      console.log(err);
      return res.send(400, err.message);
    }
    return res.status(200).send({ users });
  }).limit(size);
}
function addUser(req, res, next) {
  let user = req.body;
  const newUser = new Users(user);
  const response = newUser.save();
  res.status(201).send("User added");
}

function updateUser() {
  return async function (req, res, next) {
    let user = req.body;
    const userId = req.params.id;
    const userExists = await checkUserExists("_id", userId);
    if (!userExists) {
      return res.send(404, { message: "User not found" });
    }
    const response = await Users.findByIdAndUpdate(userId, user);
    res.status(201).send( response );
  };
}

function deleteUser() {
  return async function deleteUser(req, res, next) {
    const userId = req.params.id;
    /*const userExists = await checkUserExists("_id", userId);
    if (!userExists) {
      return res.send(404, { message: "User not found" });
    }*/
    const response = await Users.findByIdAndDelete(userId);
    res.status(201).send({message:'User deleted'});
  };
}
module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
