const { Task } = require('../models');
const TelegramClient = require('../utils/TelegramClient');

const getAll = () => Task.getAll();

const create = async (name) => {
  const task = await Task.create(name);

  await TelegramClient.sendMessage(name);

  return task;
};

module.exports = {
  getAll,
  create,
};
