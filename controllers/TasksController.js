const { Router } = require('express');
const { TaskService } = require('../services');

const TasksController = new Router();

TasksController.get('/', async (req, res) => {
  res.status(200).json(await TaskService.getAll());
});

TasksController.post('/', async (req, res) => {
  const { name } = req.body;

  const task = await TaskService.create(name);

  res.status(200).json(task);
});

module.exports = TasksController;
