import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'

const app = express()

// all static info is present in public directory
app.use(express.static("public"));

// template engine is required 
// in file way, we cant get the part of html or merge two html files
// with templating engine we can easily merge two or more components of html together
import engine from 'express-edge';
app.use(engine);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', `${__dirname}/views`);

// Mongoose connection
import mongoose from 'mongoose';
mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res)=>{
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('index')
})

// app.get('/about', (req, res)=>{
//     // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
//     res.render('about')
// })

app.get('/post', (req, res)=>{
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    res.render('post')
})

app.get('/posts/new', (req, res) => {
  res.render('create')
})

app.listen(3000, ()=>{
    console.log('APP started at port 3000!');
})