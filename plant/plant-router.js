const router = require('express').Router();
const Plant = require('./plant-model.js');

router.get('/', (req,res) => {
    Plant.get(req.id)
    .then(plant => {
        res.status(200).json(plant);
    })
    .catch(err => {
        res.status(500).json({err: "There is an issue returning plants"})
    })
});

module.exports = router;