const { Schema, model } = require('mongoose')

const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true,  'Must provide a name'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters']
  },
  priority: {
    type: String,
    default: 'Normal'
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = model('Task', TaskSchema)