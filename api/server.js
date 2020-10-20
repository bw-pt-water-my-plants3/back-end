const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('../user/userModel.js');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/authRouter.js');
const plantsRouter = require('../plants/plantsRouter.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    db.find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((err) => {
            res.status(500).json(err);
        });

})

server.use('/api/auth', authRouter);
server.use('/api/plants', authenticate, plantsRouter);

module.exports = server;
