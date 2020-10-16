const express = require('express');
const helmet = require('helmet');
const AuthRouter = require('./auth/authRouter');
const cors = require('cors');
const errorHandler = require('./auth/ErrorHandler')
const authenticate = require('./auth/authenticate-middleware')
const UserRouter = require('./user/UserRouter')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/auth', AuthRouter);
server.use('/user',authenticate, UserRouter);

server.get('/', (req,res) => {
    res.status(200).json({message:'Welcome to the Plants Backend'})
})

server.use(errorHandler)

module.exports = server;