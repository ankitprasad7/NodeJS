const fs = require("fs");
const path = require("path");
let users = [];
var lastuserid;
let books=[];
const userPath = path.join(__dirname, "..", "/files/users.json");

readUser();

function readUser() {
  fs.readFile(userPath, "utf-8", function (error, data) {
    if (error) {
      return console.error(error);
    }
    users = JSON.parse(data);
  });
}

function getdata(req, res, next) {
  fs.readFile(userPath, "utf-8", function (err, data) {
    if (err) {
      return res.status(404, err);
    }
    console.log(data);
    res.status(200).send(data);
  });
}

function writeData(data) {
  fs.writeFile(userPath, JSON.stringify(data), function (error) {
    if (error) {
      return res.status(404);
    }
  });
}

function writeUser() {
  let user = req.body;
  user.id = (++lastuserid).toString();
  users.push(user);
  writeData(users);
  res.send(201, users);
  next();
}

function updateData(req, res, next) {
  let user = req.body;
  const userId = req.params.id;
  delete user.id;
  const userExist = users.findIndex((item) => item.id === userId);
  if (userExist === -1) {
    return res.send(404, { message: "user not found" });
  }
  user = { id: userId, ...user };
  users[userExist] = user;
  writeData(users);
  res.send(200);
  next();
}

function delData(req, res, next) {
  const userId = req.params.id;
  const userExist = users.findIndex((item) => item.id === userId);
  if (userExist === -1) {
    return res.send(404, { message: "user not found" });
  }
  users.splice(userExist, 1);
  writeData(users);
  res.send(200);
  next();
}


function getBooks(req, res, next) {
  fs.readFile(path.join(userPath), 'utf-8', function (err, data) {
      if (err) {
          return res.status(404, err);
      }
      console.log(data);
      res.status(200).send(data);
  })
}

function addBooks(req, res, next) {
  const userId = req.params.id;
  const book = req.body;
  const user = users.filter(item => item.id === userId);
  if (user === undefined) {
    return res.send(404, { message: "user not found" });
  }
  book.id = (++lastbookid).toString();
  books.push(book);
 
  writeData(books);
  res.send(201, books);
  next();

}

function updateBooks (req, res, next) {
  const userId = req.params.id;
  let book = req.body;
  delete book.userId;
  const Exist = books.findIndex(item => item.userId === userId);
  if (Exist === -1) {
    return res.send(404, { message: 'user not found' });
  }
  book = { userId: userId, ...book };
  books[Exist] = book;
  writeData(books)
  res.send(200);
  next();

}

function delBooks(req, res, next) {
  const userId = req.params.id;
  const Exist = books.findIndex(item => item.userId === userId);
  if (Exist === -1) {
    return res.send(404, { message: 'user not found' });
  }
  books.splice(Exist, 1);
  writeData(books);
  res.send(200);
  next();
}
module.exports = {
  readUser,
  getdata,
  writeUser,
  updateData,
  delData,
getBooks,
addBooks,
updateBooks,
delBooks
};
