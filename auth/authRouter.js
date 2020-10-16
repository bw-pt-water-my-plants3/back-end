const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Plants = require('../user/User-model')

router.post('/register', async (req,res,next) => {
    const credentials = req.body;
    console.log('authRouther register1:',credentials)
    try {
        if (credentials) {
            const rounds = 8;
            const hash = bcryptjs.hashSync(credentials.password,rounds);
            credentials.password = hash;

            const user = await Plants.add(credentials);
            console.log('user in the authrouter reg.:', user)
            const token = generateToken(user);
            res.status(200).json({ data: user,token})
        }else{
            res.status(400).json({ apiCode:400, apiMessage: 'username or password missing'});
        }
    }catch(err){
        next({ apiCode:500, apiMessage: 'error with authrouter saving to database'})
    }
})

router.post('/login', async (req,res,next) => {
    const {username, password} = req.body;
    console.log('user', req.body)

    try{
        if(!req.body) {
            next({ apiCode: 400, apiMessage: 'username or password missing or password not alphanumerical'})
        }else{
            const [user] = await Plants.findBy({ username:username});
            if (user && bcryptjs.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({message: ' welcome to the api, token:', token})
            } else{
                next({ apiCode:401, apiMessage: 'invalid credentials'});
            }
        }
    }catch (err) {
        next({ apiCode:500, apiMessage:'error logging and the db', ...err})
    }
})

function generateToken(user) {

    const payload = {
        subject:user.id,
        username:user.username,
        rolename:user.rolename
    }
    const secret = process.env.secret || 'IJIwjjijd3887&^@&'

    const options = {
        expiresIn: '1d'
    }

    const token = jwt.sign(payload, secret, options);

    return token
}

module.exports = router;