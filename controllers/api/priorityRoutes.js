const router = require('express').Router();
const { Priority, Task } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const priorityData = await Priority.findAll({
      include: [{ model: Task }],
    });
    res.status(200).json(priorityData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const priorityData = await Priority.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!priorityData) {
      res.status(404).json({ message: 'No Priority ID found' });
      return;
    }
    res.status(200).json(priorityData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
    try {
      const priorityData = await Priority.create(req.body);
      res.status(200).json(priorityData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const priorityData = await Priority.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!priorityData[0]) {
        res.status(404).json({ message: 'No Priority found with this ID' });
        return;
      }
      res.status(200).json(priorityData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const priorityData = await Priority.destroy({
        where: {
          id: req.params.id
        }
      });
      if (!priorityData) {
        res.status(404).json({ message: 'No category found with this ID'});
        return;
      }
      res.status(200).json(priorityData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;