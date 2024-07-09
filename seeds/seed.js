const seedCategories = require('./category-seeds');
const seedTasks = require('./tasks-seeds');
const seedUsers = require('./users-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedTasks();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
