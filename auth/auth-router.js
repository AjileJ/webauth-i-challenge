const bcrypt = require('bcryptjs'); // npm i bcryptjs
const router = require('express').Router();
const Users = require('../users/users-model');





router.post('/register', (req,res) => {
  let credentials = req.body;
  bcrypt.hash(credentials.password, 12,(err,hashedPassword) => {
    credentials.password = hashedPassword;
    Users.add(credentials)
    .then(saved => {
      req.session.username = saved.username;
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  })
})

router.post('/login', (req,res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      console.log('user',user);
      if (user && bcrypt.compareSync(password,user.password)) {
        // console.log(user.username)
        req.session.username = user.username;
        // console.log(req.session)
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.get('/logout', (req,res) => {
  console.log('s',req.session)
  if(req.session) {
    req.session.destroy(error => {
      if(error){
        res.status(500).json({message: "you cannot leave"});
      }else{
        res.status(200).json({message: "logged out !"})
      }
    })
  }else{
    res.status(200).json({message: "by felicia"})
  }
});

module.exports = router;