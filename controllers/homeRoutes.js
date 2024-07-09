const router = require('express').Router();
const Task = require('../models/User');

router.get('/', async (req, res) => {
    const taskData = await Task.findAll({

    });

    const tasks = taskData.map((project) => project.get({ plain: true }));
    res.render('homepage', { tasks });
});

module.exports = router;