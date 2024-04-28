const { isValidObjectId } = require('mongoose')
const Task = require('../models/task')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    return res.json({ tasks })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

const createTask = async (req, res) => {
  const { name, completed, priority } = req.body
  try {
     const task = await Task.create({
			name,
			completed,
      priority,
		})
		return res.status(201).json({ task })
  } catch (err) {
    return res.status(400).json({ msg: err.message })
  }
}

const getTask = async (req, res) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
     return res.status(400).json({ msg: 'Invalid ID' })
  }

	try { 
    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }

    return res.json({ task })

  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

const updateTask = async (req, res) => {
	const { id } = req.params

  if (!isValidObjectId(id)) {
     return res.status(400).json({ msg: 'Invalid ID' })
  }



	try { 
    const task = await Task.findByIdAndUpdate(id, {
      ...req.body
    }, { new: true, runValidators: true })

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }
    return res.json({ task })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

const deleteTask = async (req, res) => {
	const { id } = req.params

  if (!isValidObjectId(id)) {
     return res.status(400).json({ msg: 'Invalid ID' })
  }

	try { 
    const task = await Task.findByIdAndDelete(id)
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }
    return res.json({ msg: 'Task deleted' })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

module.exports = {
	getAllTasks,
	createTask,
  getTask,
  updateTask,
  deleteTask
}