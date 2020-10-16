const express = require('express');
const helmet = require('helmet');
const AuthRouter = require('./auth/authRouter');
const plantRouter = require('./plant/plant-router');
const cors = require('cors');
const errorHandler = require('./auth/ErrorHandler')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/auth', AuthRouter);
server.use('/plant', plantRouter);

server.get('/', (req,res) => {
    res.status(200).json({message:'you did it you son of a b*tch'})
})

server.use(errorHandler)

module.exports = server;