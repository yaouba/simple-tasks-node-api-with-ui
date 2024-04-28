const { isValidObjectId } = require('mongoose')
const Task = require('../models/task')
const asyncWrapper = require('../middlewares/async')

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

const getTask = asyncWrapper(async (req, res) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		return res.status(400).json({ msg: 'Invalid ID' });
	}
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ msg: 'Task not found' });
  }
  return res.json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		return res.status(400).json({ msg: 'Invalid ID' });
	}
	const task = await Task.findByIdAndUpdate(
		id,
		{
			...req.body,
		},
		{ new: true, runValidators: true }
	);

	if (!task) {
		return res.status(404).json({ msg: 'Task not found' });
	}
	return res.json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		return res.status(400).json({ msg: 'Invalid ID' });
	}

	const task = await Task.findByIdAndDelete(id);
	if (!task) {
		return res.status(404).json({ msg: 'Task not found' });
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