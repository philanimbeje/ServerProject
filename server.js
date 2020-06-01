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


const projectRoutes = require('./src/routes/projectRoutes');
  app.use('/project', projectRoutes);

 
app.listen(process.env.PORT || 3000);