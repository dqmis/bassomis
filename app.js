const express = require('express');
const config = require('./config/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');


// DB connection
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('connected to databse ' + config.database);
});

mongoose.connection.on('err', () => {
    console.log('failed to connect to database "' + config.database + '" ' + err);
});

// Express App
const app = express();



app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const categories = require('./routes/categories');
const posts = require('./routes/posts');
const users = require('./routes/users');

app.use('/categories', categories);
app.use('/posts', posts);
app.use('/users', users);

const port = process.env.PORT || 3000;


process.env.PWD = process.cwd();

const Path = path.join(process.env.PWD, 'public');

app.use(express.static(Path));

app.get('/google4352428df994bdcb.html', (req, res) => {
  res.send('google4352428df994bdcb.html');
});

app.get('/', (req, res) => {
  res.render('index.html');
});

app.all('*', (req, res) => {
  console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
  res.status(200).sendFile(Path + '/index.html');
});

app.listen(port, () =>{
    console.log('Connected on port ' + port);
});



