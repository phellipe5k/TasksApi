const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const { TelegramClient } = require('messaging-api-telegram');

const app = express();
const PORT = 3000;



const MONGODB_URL = 'mongodb://127.0.0.1:27017';
const DATABASE = 'TaskDB';

const connection = () => {
  return MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((conn) => conn.db(DATABASE))
  .catch((err) => {
    process.exit();
  });
}



// get accessToken from telegram [@BotFather](https://telegram.me/BotFather)
const client = new TelegramClient({
  accessToken: '178115935:AAFCTczMnmQrjqHCv2qErmCXWrRrGeD7qG4',
});

client.getWebhookInfo().catch((error) => {
  console.log(error); // formatted error message
  console.log(error.stack); // error stack trace
  console.log(error.config); // axios request config
  console.log(error.request); // HTTP request
  console.log(error.response); // HTTP response
});

module.exports = connection;

app.use(bodyParser.json())

app.get('/tasks', async (req, res) => {
  const tasks = await connection().then((db) => db.collection('tasks').find().toArray());
  res.status(200).json(tasks);
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  const task = await connection().then((db) => db.collection('tasks').findOne(ObjectId(id)));

  res.status(200).json(task);
});

app.post('/tasks', async (req, res) => {
  const { name } = req.body;

  const { insertedId: id } = await connection().then((db) => db.collection('tasks').insertOne({ name }));

  const task = { id, name };

  res.status(200).json(task);
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await connection().then((db) => db.collection('tasks').updateOne({ _id: ObjectId(id) }, { $set: { name } }));

  res.status(204).end();
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  await connection().then((db) => db.collection('tasks').deleteOne({ _id: ObjectId(id) }));

  res.status(200).json({});
});

app.listen(PORT, () => console.log('App listening on PORT %s', PORT))