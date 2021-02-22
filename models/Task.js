const connection = require('./connection');

const getAll = async () => {
  await connection().then((db) => db.collection('tasks').find().toArray());
};

const create = async (name) => {
  const { insertedId } = await connection().then((db) => db.collection('tasks').insertOne({ name }));
  return {
    id: insertedId,
    name,
  };
};

module.exports = {
  getAll,
  create,
};
