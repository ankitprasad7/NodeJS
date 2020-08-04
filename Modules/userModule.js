const Users=require('../Models/user');


async function checkUserExists(field,value){
  const users= await Users.find({[field]:value}).exec();
  console.log('Users::',users);
  return users.length;
}

function getUsers(req,res,next){
  const query = JSON.parse(req.query.query);
const size=req.query.size||10;

  var mysort={item:req.query.sort};
  Users.find(query).limit(size).sort(mysort).exec(function (err, users) {
  
  
  Users.find(query).exec(async function(err,users){
    if(err){
      console.log(err);
      return res.send(400,err.message)
    }
    const count=await Users.count(query).exec();
    return res.status(200).send({users,count});
  });
  })
}
function addUser(){
  return async function(req,res,next){
    let user=req.body;
const newUser=new Users(user);
const response= await newUser.save()
res.status(201).send('User added')  
  }

}

function updateUser() {
  return async function(req,res,next){
    let user=req.body;
    const userId=req.params.id;
    const userExists=await checkUserExists("_id",userId)
    if(!userExists){
      return res.send(404,{message:'User not found'})
    }
    const response=await Users.findByIdAndUpdate(userId,user);
    res.status(201).send({response})
  }
}

function updateUserPatch() {
  return async function(req,res,next){
    let user=req.body;
    const userId=req.params.id;
    const userExists=await checkUserExists("_id",userId)
    if(!userExists){
      return res.send(404,{message:'User not found'})
    }
    const response=await Users.findByIdAndUpdate(userId,{$set:user})
    res.status(201).send({data:response})
  }
}

function deleteUser(){
  return async function(req,res,next){
    const userId=req.params.id;
    const userExists=await checkUserExists("_id",userId)
    if(!userExists){
      return res.send(404,{message:'User not found'})
    }
    const response=await Users.findByIdAndDelete(userId)
    res.status(201).send({data:response})
  }
}
module.exports=
{
getUsers,
addUser,
updateUser,
updateUserPatch,
deleteUser
}


