const User = require('./User');
const Task = require('./tasks');

User.hasMany(Task, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Task.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Task };
