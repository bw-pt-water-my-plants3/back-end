const router = require('express').Router();
const { update } = require('../data/connection.js');
const Plant = require('./plant-model.js');

router.get('/', (req, res) => {
    Plant.get()
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Plant.getUserPlants(id)
        .then(plant => {
            if (plant.length) {
                res.json(plant);
            } else {
                res.status(404).json({ message: 'No plants exist for this user' })
            }
        })
        .catch(err => {
            res.status(500).json({ err: "There is an error getting users plants" })
        })
});

router.post('/:id', async (req, res) => {
    const plantData = { ...req.body, user_id: req.params.id };
    console.log(plantData);
    try {
        const plant = await Plant.add(plantData);
        res.status(201).json(plant);
    } catch (err) {
        res.status(500).json({ err: "error" })
    }
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    Plant.edit(req.params.id, changes)
        .then(update => {
            if (update) {
                res.jason([update]);
            } else {
                res.status(404).json({ message: 'Could not find plant with given id' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to edit plant' });
        });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Plant.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({ message: 'Deleted plant' });
            } else {
                res.status(404).json({ message: 'Could not find plant with given id' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete plant' });
        });
})

module.exports = router;