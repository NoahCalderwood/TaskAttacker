const { Task } = require('../models');
const taskData = [
  {
    task_name: 'Groceries',
    user_id: 3,
    category_id: 1,
    priority_name: 'low',
    due_date: '2024-07-20',
    task_time: '17:00:00',
    todo_day: 'Monday',
    week_of_year: 5
  },
  {
    task_name: 'Clean',
    user_id: 2,
    category_id: 1,
    priority_name: 'medium',
    due_date: '2024-07-20',
    task_time: '15:30:00',
    todo_day: 'Tuesday',
    week_of_year: 5
  },
  {
    task_name: 'Maintenance',
    user_id: 3,
    category_id: 2,
    priority_name: 'low',
    due_date: '2024-07-20',
    task_time: '16:00:00',
    todo_day: 'Wednesday',
    week_of_year: 5
  },
  {
    task_name: 'Laundry',
    user_id: 4,
    category_id: 1,
    priority_name: 'high',
    due_date: '2024-07-20',
    task_time: '18:30:00',
    todo_day: 'Thursday',
    week_of_year: 5
  },
  {
    task_name: 'Feed Pets',
    user_id: 5,
    category_id: 5,
    priority_name: 'medium',
    due_date: '2024-07-20',
    task_time: '16:45:00',
    todo_day: 'Friday',
    week_of_year: 5
  },
  {
    task_name: 'Mow',
    user_id: 1,
    category_id: 3,
    priority_name: 'high',
    due_date: '2024-07-20',
    task_time: '17:40:00',
    todo_day: 'Saturday',
    week_of_year: 5
  },
  {
    task_name: 'Make Dinner',
    user_id: 2,
    category_id: 5,
    priority_name: 'low',
    due_date: '2024-07-20',
    task_time: '18:25:00',
    todo_day: 'Monday',
    week_of_year: 5
  },
  {
    task_name: 'Walk the dog',
    user_id: 2,
    category_id: 1,
    priority_name: 'high',
    due_date: '2024-07-20',
    task_time: '19:00:00',
    todo_day: 'Monday',
    week_of_year: 5
  },
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;
