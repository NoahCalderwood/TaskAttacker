const router = require('express').Router();
const { User, Task } = require('../../models');
const emailjs = require('../../config/email');

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
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const user = userData.get({ plain: true })


    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

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
