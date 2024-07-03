const tagData = [
    {
      tag_name: 'Groceries',
    },
    {
      tag_name: 'Clean',
    },
    {
      tag_name: 'Maintenance',
    },
    {
      tag_name: 'Laundry',
    },
    {
      tag_name: 'Feed Pets',
    },
    {
      tag_name: 'Mow',
    },
    {
      tag_name: 'Make Dinner',
    },
    {
      tag_name: 'Walk the dog',
    },
  ];
  
  const seedTags = () => Tag.bulkCreate(tagData);
  
  module.exports = seedTags;
  