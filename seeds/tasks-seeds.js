const { Task } = require('../models');
const taskData = [
  {
    task_name: 'Groceries',
    category_id: 1,
    priority_name: 'low'
  },
  {
    task_name: 'Clean',
    category_id: 1,
    priority_name: 'medium'
  },
  {
    task_name: 'Maintenance',
    category_id: 2,
    priority_name: 'low'
  },
  {
    task_name: 'Laundry',
    category_id: 1,
    priority_name: 'high'
  },
  {
    task_name: 'Feed Pets',
    category_id: 5,
    priority_name: 'medium'
  },
  {
    task_name: 'Mow',
    category_id: 3,
    priority_name: 'high'
  },
  {
    task_name: 'Make Dinner',
    category_id: 5,
    priority_name: 'low'
  },
  {
    task_name: 'Walk the dog',
    category_id: 1,
    priority_name: 'high'
  },
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;
