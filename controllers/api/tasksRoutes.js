const router = require('express').Router();
const { Task, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const taskData = await Task.findAll({
      include: [{ model: User, attributes: ['name'] }],
    });
    res.status(200).json(taskData);


  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        },
      ],
    });

    if (!taskData) {
      res.status(404).json({ message: 'No task found with that id!' });
      return;
    }
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newTask = await Task.create({
      task_name: req.body.name,
      category_name: req.body.category,
      due_date: req.body.due,
      priority_name: req.body.priority,
      task_time: req.body.time,
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
    const deleteTask = await Task.destroy({
      where: {
        task_id: req.params.id
      },
    });

    if (!deleteTask) {
      res.status(404).json({ message: 'No tasks found with this id!' });
      return;
    }

    res.status(200).json(deleteTask);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

module.exports = router;
