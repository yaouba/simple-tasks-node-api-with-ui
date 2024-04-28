const { isValidObjectId } = require('mongoose')
const Task = require('../models/task')
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  return res.json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
	const { name, completed, priority } = req.body;
  const task = await Task.create({
    name,
    completed,
    priority,
  });
  return res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
    return next(createCustomError('Invalid task id', 400));
	}
  const task = await Task.findById(id);
  if (!task) {
    return next(createCustomError('Task not found', 404));
  }
  return res.json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		 return next(createCustomError('Invalid task id', 400));
	}
	const task = await Task.findByIdAndUpdate(
		id,
		{
			...req.body,
		},
		{ new: true, runValidators: true }
	);

	if (!task) {
		return next(createCustomError('Task not found', 404));
	}
	return res.json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		 return next(createCustomError('Invalid task id', 400));
	}

	const task = await Task.findByIdAndDelete(id);
	if (!task) {
		return next(createCustomError('Task not found', 404));
	}
	return res.json({ msg: 'Task deleted' });
});

module.exports = {
	getAllTasks,
	createTask,
  getTask,
  updateTask,
  deleteTask
}