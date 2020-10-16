const express = require('express');
const helmet = require('helmet');
const AuthRouter = require('./auth/authRouter');
const plantRouter = require('./plant/plant-router');
const cors = require('cors');
const errorHandler = require('./auth/ErrorHandler')
const authenticate = require('./auth/authenticate-middleware')
const UserRouter = require('./user/UserRouter')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/auth', AuthRouter);
<<<<<<< HEAD
server.use('/user',authenticate, UserRouter);
=======
server.use('/plant', plantRouter);
>>>>>>> f937fcde3627e1a4a7c9cfab595d50bd85f0eef5

server.get('/', (req,res) => {
    res.status(200).json({message:'Welcome to the Plants Backend'})
})

server.use(errorHandler)

module.exports = server;