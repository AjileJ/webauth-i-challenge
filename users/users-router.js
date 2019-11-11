const router = require('express').Router();
const restricted = require('../auth/requires-auth-middleware');
const Users = require('./users-model.js');

router.get('/',restricted, (req,res) => {
  Users.find()
  .then(users => {
    res.json(users);
  })
  .catch(err => res.send(err));
})

module.exports = router;