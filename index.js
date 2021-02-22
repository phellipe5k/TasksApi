const express = require('express');
const bodyParser = require('body-parser');
const { TasksController } = require('./controllers');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/tasks', TasksController);

app.listen(PORT, () => console.log('App listening on PORT %s', PORT));
