import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

const app = express();
app.use(bodyParser.json());

// openssl rand -base64 32
const SECRET_KEY = process.env.JWT_SECRET;

// mock user data
const users = [{ id: 1, username: 'user1', password: bcrypt.hashSync('password1', 8) }];

app.post('/login', (req, res)=>{
    const { username, password } = req.body;
    const user = users.find(u => u.username == username);
    if(user && bcrypt.compareSync(password, user.password)) {
        //auth is success then return the token
        const token = jwt.sign({id: user.id, username: username}, SECRET_KEY, {expiresIn: '1h'});
        res.json({token});
    } else {
        res.status(401).send('Invalid creds');
    }
})

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(token) {
        jwt.verify(token, SECRET_KEY, (err, user)=>{
            if(err) {
                res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } else {
        res.sendStatus(401);
    }
}

app.get('/protected', authenticateJWT, (req, res) => {
    res.send(`Hey ${req.user?.username} you're able to access the protected route`);
})

app.listen(3000, ()=>{
    console.log('App started on post 3000!');
})


