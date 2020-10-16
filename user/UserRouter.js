const bcryptjs = require('bcryptjs');
const dbConfig = require('../../../db3/node-db3-project/data/db-config');
const router = require('express').Router();
const User = require('./User-model')

router.get('/:id', async (req,res) => {
    try{
        const {id} = req.params

        const found = await Users.findById(id)
        res.status(200).json({message:"found"})

    }catch(err){
        next({apiCode:500,apiMessage:'error updating to database'})
    }
})

router.put('/:id', async (req,res) => {

    try{
        const user = req.body;
        const {id} = req.params
        const rounds = 8
        const hash = bcryptjs.hashSync(user.password,rounds)
        user.password = hash;

        const updated = await User.userUpdate(user,id)
        res.status(200).json({message:"updated"})

    }catch(err){
        next({apiCode:500,apiMessage:'error updating to database'})
    }
})

router.delete('/:id',async (req,res) => {
    try{const {id} = req.params
        const deleted = await User.userRemove(id)
        res.status(201).json({message:"deleted"})

    }catch(err){
        next({apiCode:500,apiMessage:'error updating to database'})
}
})



module.exports = router