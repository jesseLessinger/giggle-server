const app = require('express')();
const bodyParer = require('body-parser');
const db = require('../database/db-helpers');
const { passport } = require('../database/auth-helpers');


const WEBSERVER_PORT = process.env.WEBSERVER_PORT || 3030;

// MIDDLEWARE
app.use(bodyParer.json());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(req.method, req.path)
  next();
});

app.post('/user', (req, res) => {
  const user = req.body;
  db.createUser(user).then(() => {
    console.log(`new user: ${user.username} created.`)
  }).catch(console.log);
});

app.post('/login', 
  passport.authenticate('local', { failureFlash: 'login failure' }),
  function(req, res) {
    res.status(201)
    // req.user.token
    res.send(req.user)
  });

// START SERVER
app.listen(WEBSERVER_PORT, () => console.log(`Giggle webserver listening on ${WEBSERVER_PORT}`))