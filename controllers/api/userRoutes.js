const router = require('express').Router();
// Import the User model from the models folder
const { User, Task } = require('../../models');
const emailjs = require('../../config/email');

const mondayTasks = [];
const tuesdayTasks = [];
const wednesdayTasks = [];
const thursdayTasks = [];
const fridayTasks = [];
const saturdayTasks = [];
const sundayTasks = [];


router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// If a POST request is made to /api/users, a new user is created. The user id and logged in state is saved to the session within the request object.
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a POST request is made to /api/users/login, the function checks to see if the user information matches the information in the database and logs the user in. If correct, the user ID and logged-in state are saved to the session within the request object.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email }, include: [Task] });
    // console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    // console.log(`valid pw: ${validPassword}`);
    // console.log(`req body: ${JSON.stringify(req.body)}`);
    // console.log(`user check pw: ${userData.checkPassword(req.body.password)}`);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const user = userData.get({ plain: true })

    // console.log(userData);
    // console.log(users.tasks);
    // console.log(user);
    //console.log(user.tasks.map((task) => task.todo_day));

    fullTask = user.tasks.map((task) => task);
    taskDays = user.tasks.map((task) => task.todo_day);
    taskName = user.tasks.map((task) => task.task_name);
    console.log(fullTask);

    // How can we store the data for each task as an object into session?
    // Want to grab
    // taskObj = { taskDays, taskName };
    // console.log(taskObj);

    groupDays(taskDays);

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      req.session.tasks = user.tasks;
      req.session.mondayTasks = mondayTasks;
      req.session.tuesdayTasks = tuesdayTasks;
      req.session.wednesdayTasks = wednesdayTasks;
      req.session.thursdayTasks = thursdayTasks;
      req.session.fridayTasks = fridayTasks;
      req.session.saturdayTasks = saturdayTasks;
      req.session.sundayTasks = sundayTasks;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

function groupDays(taskDays) {
  for (let i = 0; i < taskDays.length; i++) {
    switch (taskDays[i]) {
      case 'Monday':
        mondayTasks.push(JSON.stringify(fullTask[i]));
        break;
      case 'Tuesday':
        tuesdayTasks.push(taskName[i]);
        break;
      case 'Wednesday':
        wednesdayTasks.push(taskName[i]);
        break;
      case 'Thursday':
        thursdayTasks.push(taskName[i]);
        break;
      case 'Friday':
        fridayTasks.push(taskName[i]);
        break;
      case 'Saturday':
        saturdayTasks.push(taskName[i]);
        break;
      case 'Sunday':
        sundayTasks.push(taskName[i]);
        break;
    }
  };
  console.log(`Monday: ${mondayTasks}`);
  console.log(`Tuesday: ${tuesdayTasks}`);
  console.log(`Wednesday: ${wednesdayTasks}`);
  console.log(`Thursday: ${thursdayTasks}`);
  console.log(`Friday: ${fridayTasks}`);
  console.log(`Saturday: ${saturdayTasks}`);
  console.log(`Sunday: ${sundayTasks}`);
};

// If a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Handle user signing up route
router.post('/signup', async (req, res) => {
  try {
    const newUser = new User()
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    const userData = await newUser.save();

    req.session.save(async () => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);

      const params = {
        name: newUser.name,
        email: newUser.email
      }
      const serviceID = 'service_0d96fi5';
      const templateID = 'welcome_form';
      console.log({ serviceID, templateID, params })
      try {
        const emailResponse = await emailjs.send(serviceID, templateID, params)
        console.log(emailResponse)
      } catch (err) {
        console.error(err)
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
