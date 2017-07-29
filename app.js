const express = require('express');
const config = require('./config/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


// DB connection
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('connected to databse ' + config.database);
});

mongoose.connection.on('err', () => {
    console.log('failed to connect to database "' + config.database + '" ' + err);
});

const app = express();



app.use(cors());
app.use(bodyParser.json());

const categories = require('./routes/categories');
const posts = require('./routes/posts');

app.use('/categories', categories);
app.use('/posts', posts);

const port = 3000;



app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index.html');
});

app.listen(port, () =>{
    console.log('Connected on port ' + port);
});



