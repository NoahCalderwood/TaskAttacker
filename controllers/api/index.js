const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const priorityRoutes = require('./priorityRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./category-routes');


// When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.
router.use('/priority', priorityRoutes);
router.use('/users', userRoutes);
router.use('/category', categoryRoutes);


module.exports = router;
