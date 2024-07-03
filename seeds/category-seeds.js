const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Home',
  },
  {
    category_name: 'Auto',
  },
  {
    category_name: 'Lawn',
  },
  {
    category_name: 'Work',
  },
  {
    category_name: 'Kids',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
