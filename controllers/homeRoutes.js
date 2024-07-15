const router = require('express').Router();
const Task = require('../models/tasks');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const taskData = await Task.findAll({

    }).catch((err) => {
        res.json(err);
    });

    const tasks = taskData.map((project) => project.get({ plain: true }));
    res.render('homepage', {
        tasks,
        mondayTask: tasks.filter(t => { t.todo_day === 'Monday' })
    });
});

// GET tasks to be rendered individually
router.get('/task/:id', withAuth, async (req, res) => {
    try {
        const taskData = await Task.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
        });

        const task = taskData.get({ plain: true });

        res.render('tasks/task', {
            ...task,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Find the logged in user based on the session user ID
router.get('/homepage', withAuth, async (req, res) => {
    try {
        const taskData = await Task.findAll({
            where: { user_id: req.session.user_id },
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
        });

        const tasks = taskData.map((task) => task.get({ plain: true }));

        res.render('homepage', {
            tasks,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Redirect the request to another route if user logged in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('homepage');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('homepage');
        return;
    }

    res.render('signup')
});

router.get('/task-add', (req, res) => {
    if (req.session.logged_in) {
        res.render('tasks/task-add', {
            logged_in: req.session.logged_in
        });
        return;
    }

    res.redirect('login')
});

// Define task to be edited via ID
router.get("editpost/:id", async (req, res) => {
    try {
        const taskData = await Task.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"]
                }
            ],
        });

        const task = taskData.get({ plain: true });

        res.render("tasks/task-edit", {
            ...task,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err)
        res.status(500).json(err);
    }
});

module.exports = router;