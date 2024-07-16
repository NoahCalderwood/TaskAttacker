const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');
const taskRoutes = require('./tasksRoutes')

router.use('/users', userRoutes);
router.use('/task', taskRoutes);

module.exports = router;
