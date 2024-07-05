const User = require('./User');
const Task = require('./tasks');
const Category = require('./category');
const Priority = require('./priority');

User.hasMany(Task, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Task.belongsTo(User, {
  foreignKey: 'user_id'
});

Category.hasMany(Task, {

});

Task.belongsTo(Category, {

});

Task.hasOne(Priority, {
  foreignKey: 'priority_id'
});

Priority.belongsToMany(Task, {
  foreignKey: 'priority_id'
});



module.exports = { User, Task, Category, Priority };
