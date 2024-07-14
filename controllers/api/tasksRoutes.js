const router = require('express').Router();
const { Task, User, Category } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const taskData = await Task.findAll({
      include: [{ model: User }, { model: Category }],
    });
    res.status(200).json(taskData);


  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTask);
  } catch (err) {
    console.error(err)
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const taskData = await Task.update(req.body, {
      task_name: req.body.task,
      post_body: req.body.body
    }, {
      where: { id: req.params.id },
    });

    if (!taskData) {
      res.status(404).json({ message: 'No Task found with this ID' });
      return;
    }
    res.status(200).json(taskData);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const taskData = await Task.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!taskData) {
      res.status(404).json({ message: 'No tasks found with this id!' });
      return;
    }

    res.status(200).json(taskData);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

module.exports = router;
