const { Task } = require('../models');
const taskData = [
  {
    task_name: 'Groceries',

    user_id: 3,

    category_id: 1,
    priority_name: 'low'
  },
  {
    task_name: 'Clean',

    user_id: 2,

    category_id: 1,
    priority_name: 'medium'
  },
  {
    task_name: 'Maintenance',

    user_id: 3,

    category_id: 2,
    priority_name: 'low'
  },
  {
    task_name: 'Laundry',

    user_id: 4,

    category_id: 1,
    priority_name: 'high'
  },
  {
    task_name: 'Feed Pets',

    user_id: 5,

    category_id: 5,
    priority_name: 'medium'
  },
  {
    task_name: 'Mow',

    user_id: 1,

    category_id: 3,
    priority_name: 'high'
  },
  {
    task_name: 'Make Dinner',

    user_id: 2,

    category_id: 5,
    priority_name: 'low'
  },
  {
    task_name: 'Walk the dog',

    user_id: 5,

    category_id: 1,
    priority_name: 'high'
  },
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;
