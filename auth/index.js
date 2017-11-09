var jwt = require('jsonwebtoken');
var { Users } = require('../models');

let tokens = {}, register, registerMiddleware;

tokens.generate = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(user, 'secret', {}, function(err, token) {
      if(err) reject(err);
      else {
        resolve(token);
      }
    });
  })
};

tokens.save = (user, token) => {
  return new Promise((resolve, reject) => {
    Users.findByIdAndUpdate(user._id, {
      tokens: {
        local: token
      }
    }, function(err, response) {
      if(err) reject(err);
      else resolve(response);
    });
  });
}

tokens.validate = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secret', function(err, data) {
      if(err) reject(err);
      else resolve(data);
    });
  })
}

register = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userModel = new Users();
      const token = await tokens.generate(user);

      user.tokens = { local: token };
      if(typeof user.password !== 'undefined') {
        user.password = userModel.generateHash(user.password);
      }

      Users.create(user, function(err, newUser) {
        if(err) {
          console.log(err);
          reject(err);
        }
        else {
          resolve(newUser);
        }
      });

    }
    catch(err) {
      console.log(err);
      reject(err);
    }
  });

}

registerMiddleware = async (req, res) => {
  try {
    user = req.body;
    const newUser = await register(user);
    res.send(newUser);
  }
  catch(err) {
    console.log(err);
    res.send(err);
  }
}

module.exports = { register, registerMiddleware, tokens };
