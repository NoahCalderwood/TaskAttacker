const { Task } = require('../models');
const taskData = [
    {
      task_name: 'Groceries', 
      category_id: 1,
      priority_id: 1
    },
    {
      tag_name: 'Clean',
      category_id: 1,
      priority_id: 2
    },
    {
      tag_name: 'Maintenance',
      category_id: 2,
      priority_id: 3
    },
    {
      tag_name: 'Laundry',
      category_id: 1,
      priority_id: 1
    },
    {
      tag_name: 'Feed Pets',
      category_id: 5,
      priority_id: 2
    },
    {
      tag_name: 'Mow',
      category_id: 3,
      priority_id: 3
    },
    {
      tag_name: 'Make Dinner',
      category_id: 5,
      priority_id: 1
    },
    {
      tag_name: 'Walk the dog',
      category_id: 1,
      priority_id: 2
    },
  ];
  
  const seedTasks = () => Task.bulkCreate(taskData);
  
  module.exports = seedTasks;
  