const { Priority } = require('../models');

const priorityData = [
  {
    priority_name: 'Low',
  },
  {
    priority_name: 'Medium',
  },
  {
    priority_name: 'High',
  },
];

const seedPriority = () => Priority.bulkCreate(priorityData);

module.exports = seedPriority;
