const express = require('express')
const taskRoutes = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()


const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())

app.use('/api/v1/tasks', taskRoutes)


app.get('/', (req, res) => {
  res.json({msg: 'Hello world!!'})
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1) 
  }
}

start()

