import session from 'express-session'
import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcryptjs'

const app = express();

//middlewares
app.use(bodyParser.json())
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Ensure this is false for HTTP
    maxAge: 30 * 1000 // 30 seconds in milliseconds
  }
}))

const users = [{ id: 1, username: 'user1', password: bcrypt.hashSync('password1', 8) }];

app.post('/login', (req, res)=>{
  const { username, password } = req.body;
  const user = users.find(u=>u.username == username);
  if(user && bcrypt.compareSync(password, user.password)) {
      req.session.userId = user.id;
      res.send("Logged In"); 
  } else {
      res.sendStatus(401);
  }
})

// creating middleware
const authenticated = (req, res, next) =>{
  if(req.session.userId) {
    next();
  } else {
    res.sendStatus(401);
  }
}

//protected route
app.get('/protected', authenticated, (req, res) => {
  const user = users.find(u=> u.id == req.session.userId);
  res.send(`Hey ${user.username} you're succesfully accessing protected route`);
})

app.listen(3000, ()=>{
    console.log('App started on port 3000!');
})