const Tasks = require("../model/tasks");
const asyncWrapper = require('../middleware/async-wrapper')
const {customizeError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Tasks.find({});
    res.status(200).json({ tasks });
})

const createTask = asyncWrapper( async (req, res) => {
    const tasks = await Tasks.create(req.body);
    res.status(201).json(req.body);
})

const updateTask = asyncWrapper( async (req, res, next) => {
    const { id: taskId } = req.params;
    const task = await Tasks.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(customizeError(`No task with Id ${taskId}`, 404))
    }
    res.status(200).json({ task });
})

const deleteTask = asyncWrapper( async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Tasks.findOneAndDelete({ id: taskId });
    if (!task) {
            return next(customizeError(`No task with Id ${taskId}`, 404));

    }
    res.status(200).json({ task });
})

const getSingleTask = asyncWrapper( async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Tasks.findById(taskId);
    if (!task) {
      console.log(task);
      return next(customizeError(`No task with Id ${taskId}`, 404))
    }
    res.status(200).json({ task });
})

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
};
