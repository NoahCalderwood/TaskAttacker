const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./category-routes');
const taskRoutes = require('./tasksRoutes')

// When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.
router.use('/users', userRoutes);
router.use('/category', categoryRoutes);
router.use('/task', taskRoutes);

module.exports = router;
