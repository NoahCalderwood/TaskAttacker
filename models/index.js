const User = require('./User');
const Task = require('./tasks');
const Category = require('./category');

User.hasMany(Task, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Task.belongsTo(User, {
  foreignKey: 'user_id'
});

// TODO Setup Category relations

module.exports = { User, Task };
