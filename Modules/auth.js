const usersModel = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const password = (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            return res.send(401, err)
        }
        delete req.body.password;
        req.body.password = hash;
        next();
    })
}

  
  
const valdidate = (req, res, next) => {
    if (!req.session.userId) {
        res.send(401, {
            message: "login first"
        });
    } else if (req.params.id === req.session.userId) {
        next();
    } else {
        res.send(401, {
            message: "Unauthorized"
        });
    }
}


const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){ return res.send(401)};
    jwt.verify(token, 'shhhhh', (err, user) => {
        if(err) {return res.send(403)}
        if(req.params.id === user.id){
        req.user = user;
        next();
    }
    else {
        res.send(401, {
            message: "Unauthorized access"
        });
    }
    })
}
module.exports={
password,
authToken,
valdidate,

}
