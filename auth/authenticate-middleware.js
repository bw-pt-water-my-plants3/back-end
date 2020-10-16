const jwtSecret = 'IJIwjjijd3887&^@&'
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
  const authorization = req.headers?
  req.headers.authorization.split(' ')[1]:
  '';

  console.log('authorization',authorization)

  if (authorization){
    jwt.verify(authorization,jwtSecret,(err,decodedToken) => {
      if(err){
        next({apiCode:401, apiMessage:'invalid creds'})
      }else{
        req.decodedToken = decodedToken
        next()
      }
    })
  }else{
    next({apiCode:400, apimessage:'no creds'})
  }
};
