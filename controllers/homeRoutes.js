const router = require('express').Router();
const { User, Task } = require('../models')
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//     try {
//         const taskData = await Task.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name'],
//                 },
//             ],
//         });

//         const tasks = taskData.map((task) => task.get({ plain: true }));

//         res.render('homepage', {
//             tasks,
//             logged_in: req.session.logged_in,
//         });
//     } catch (err) {
//         console.error(err)
//         res.status(500).json(err);
//     }
// });

router.get('/', withAuth, async (req, res) => {
    try {
        const taskData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Task,
                    attributes: ['task_time', 'id', 'task_name']
                }
            ],
        });

        // const tasks = taskData.map((task) => task.get({ plain: true }));
        const user = taskData.get({ plain: true });
        console.log(user);
        res.render('homepage', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
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
// router.get('/homepage', withAuth, async (req, res) => {
//     try {
//         const taskData = await Task.findAll({
//             where: { user_id: req.session.user_id },
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name']
//                 }
//             ],
//         });

//         const tasks = taskData.map((task) => task.get({ plain: true }));

//         res.render('homepage', {
//             tasks,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Eric test homepage route:
// router.get('/homepage', withAuth, async (req, res) => {
//     try {
//         const taskData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: [
//                 {
//                     model: Task,
//                     attributes: ['task_name']
//                 }
//             ],
//         });

//         // const tasks = taskData.map((task) => task.get({ plain: true }));
//         const tasks = taskData.get({ plain: true });
//         console.log(tasks);
//         res.render('homepage', {
//             tasks,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/profile', withAuth, async (req, res) => {
//     try {
//         const taskData = await Task.findAll({
//             where: { user_id: req.session.user_id },
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name']
//                 }
//             ],
//         });

//         const tasks = taskData.map((task) => task.get({ plain: true }));

//         res.render('profile', {
//             tasks,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         console.error(err)
//         res.status(500).json(err);
//     }
// });

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Task,
                    attributes: ['task_time', 'id', 'task_name']
                }
            ],
        });

        // const tasks = taskData.map((task) => task.get({ plain: true }));
        const user = userData.get({ plain: true });
        res.render('profile', {
            user,
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
router.get("edittask/:id", async (req, res) => {
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