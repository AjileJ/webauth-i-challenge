const bcrypt = require('bcryptjs'); // npm i bcryptjs
const router = require('express').Router();
const Users = require('../users/users-model');
const reqauth = require('../auth/requires-auth-middleware');




router.post('/register', (req,res) => {
  let credentials = req.body;
  bcrypt.hash(credentials.password, 12,(err,hashedPassword) => {
    credentials.password = hashedPassword;
    Users.add(credentials)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  })
})

router.post('/login',reqauth, (req,res) => {
  let { username, password } = req.headers;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password,user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

module.exports = router;