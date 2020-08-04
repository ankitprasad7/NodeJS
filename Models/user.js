const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name: String
});
const Users=mongoose.model('Users',userSchema);
module.exports=Users;


//
/*

const fs = require("fs");
const path = require("path");
const userModel = require("../mongo/users");
const { count } = require("console");
//let users = [];
//let books = [];
//var lastbookid = 0;
//var lastId = 0;

function getUser(userId) {

  return users.filter(item => item.id === userId);


}
async function userExits(userId) {

  const users = userModel.find(userId);
  return users.length;

}

 function getdata(req, res, next) {
  const query = JSON.parse(req.query.query);
const size=req.query.size||10;


  var mysort={item:req.query.sort};

  userModel.find(query).limit(size).sort(mysort).exec(function (err, users) {
    if (err) {
      return res.send(404, { message: "content not found" });
    }
   userModel.count({},function(err,result){
      if(err){
          res.send(err)
      }
      console.log(result);
    })
    return res.status(200).send(users,distict);
  })
}

const createdata = async function (req, res, next) {
  const newUser = new userModel(req.body);
  

  const response = await newUser.save();
  // user.id = (++lastId).toString();
  //users.push(user);
  //writeData(users);
  res.send(201, response);
}

const updatedata = async function (req, res, next) {
  let user = req.body;
  const userId = req.params.id;
  //delete user.id;
  const userExit = await userExits(userId);
  if (userExit === -1) {
    return res.send(404, { message: 'user not exit' });
  }
  const response = await userModel.findByIdAndUpdate(userId,  user );
  //user = { id: userId, ...user };
  //users[userExit] = user;
  //writeData(users);
  res.send(200, response);
}
const updatepatchdata = async function (req, res, next) {
  let user = req.body;
  const userId = req.params.id;
 
  const userExit = await userExits(userId);
  if (userExit === -1) {
    return res.send(404, { message: 'user not exit' });
  }
  const response = await userModel.findByIdAndUpdate(userId, { $set: user });
  
  res.send(200, response);
}

const deletedata = async function (req, res, next) {
  const userId = req.params.id;
  const userExit = await userExits(userId);
  if (userExit === -1) {
    return res.send(404, { message: 'user not exit' });
  }
  const response = await userModel.findByIdAndRemove(userId);
  //users.splice(userExit, 1);
  //writeData(users);
  res.send(200);
}
const getBookData = function (req, res, next) {
  return res.status(200).send(books);
}
const adddata = function (req, res, next) {
  const userId = req.params.id;
  const book = req.body;
  const user = getUser(userId);
  if (user === undefined) {
    return res.send(404, { message: "not found" });
  }
  book.id = (++lastbookid).toString();
  book.userId = userId;
  books.push(book);

  writeData(books);
  res.send(201, books);
  next();
}
const updateBooksData = function (req, res, next) {
  const userId = req.params.id;
  let book = req.body;
  delete book.userId;
  const userExit = books.findIndex(item => item.userId === userId);
  if (userExit === -1) {
    return res.send(404, { message: 'user not exit' });
  }
  book = { userId: userId, ...book };
  books[userExit] = book;
  writeData(books)
  res.send(200);
  next();

}
const deleteBookData = function (req, res, next) {
  const userId = req.params.id;
  const userExit = books.findIndex(item => item.userId === userId);
  if (userExit === -1) {
    return res.send(404, { message: 'user not exit' });
  }
  books.splice(userExit, 1);
  writeData(books);
  res.send(200);
  next();
}
module.exports = {
  getdata,
  createdata,
  updatedata,
  deletedata,
  getBookData,
  adddata,
  updateBooksData,
  deleteBookData,
  updatepatchdata
}
*/