const router = require('express').Router();
const Task = require('../models/tasks');

router.get('/', async (req, res) => {
    const taskData = await Task.findAll({

    }).catch((err) => {
        res.json(err);
    });

    const tasks = taskData.map((project) => project.get({ plain: true }));
    res.render('homepage', { tasks });
});

module.exports = router;