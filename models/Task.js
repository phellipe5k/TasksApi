const connection = require("./connection");

const getAll = async (params) => {
  await connection().then((db) => db.collection('music').find().toArray());
}

module.exports = {
  getAll
}