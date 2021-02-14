const { Router } = require('express');
const { getAll } = require('../models/Task');


const TasksController = Router();

TasksController.get('/', async (req, res) => {

  res.status(200).json(await getAll());
});

TasksController.get('/:id', async (req, res) => {
  const { id } = req.params;

  res.status(200).json({});
});

TasksController.post('/', async (req, res) => {
  const {  } = req.body;

  res.status(200).json({});
});

TasksController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {  } = req.body;

  res.status(200).json({});
});

TasksController.delete('/:id', async (req, res) => {
  const { id } = req.params;

  res.status(200).json({});
});

module.exports = TasksController;