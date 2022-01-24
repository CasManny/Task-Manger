const express = require('express')

const router = express.Router()
const { getAllTasks, createTask, getSingleTask, deleteTask, updateTask } = require('../controllers/tasks')

// api/v1/task  = get all tasks
// api/v1/task = create a task
// api/v1/tasks/:id = get a single task
// api/v1/tasks/:id = delete a single task
// api/v1/tasks/:id = update a single task

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getSingleTask).delete(deleteTask).patch(updateTask)

module.exports = router