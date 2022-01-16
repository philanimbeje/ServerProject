var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors')
require('dotenv/config')
var app = express();

mongoose.connect(process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('Connected To DB'),
  err => console.log(err.message)
)

app.set('views', './src/views');
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/src/public'));

// Routes
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/home', function (req, res) {
  res.render('index');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/projects', function (req, res) {
  var data=[{
    project: 'Website',
    type: 'software',
    tools: [ 'Javascript', 'HTML', 'CSS', 'Node', 'EJS', 'ExpressJS' ],
    deployment: { accessUrl: 'www.philanimbeje.co.za', hostPlatform: 'Heroku' },
    projectUrl: 'https://github.com/philanimbeje/ServerProject',
    description: 'Personal website using ExpressJS and EJS (embedded Javascript)',
    imageUrl: 'https://www.teahub.io/photos/full/147-1473200_phone-wallpapers-tumblr-group-popular-cool-wallpaper-for.jpg',
    symbol:'fa-user'
  } ,{
    project: 'Orange ToDo App',
    type: 'software',
    tools: [ 'HTML', 'CSS', 'EJS', 'ExpressJS', 'Javascript', 'Node' ],
    deployment: {
      accessUrl: 'https://orangetodoapp.herokuapp.com/',
      hostPlatform: 'Heroku'
    },
    projectUrl: 'https://github.com/philanimbeje/simpleToDo',
    description: 'A simple Todo application using browser localStorage for persistence',
    imageUrl: 'https://www.teahub.io/photos/full/147-1473200_phone-wallpapers-tumblr-group-popular-cool-wallpaper-for.jpg',
    symbol:'fa-clipboard-check'
  }];
  res.render('projects', {data});
});

app.get('/contact', function (req, res) {
  res.render('contact');
});


const projectRoutes = require('./src/routes/projectRoutes');
  app.use('/project', projectRoutes);

 
app.listen(process.env.PORT || 3000);