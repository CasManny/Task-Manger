const Tasks = require("../model/tasks");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const tasks = await Tasks.create(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    res.status(404).json({ msg: "something went wrong" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No Task with id ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(404).json({ msg: "something went wrong" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findOneAndDelete({ id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `No Task with id ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(404).json({ msg: "something went wrong" });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findById(taskId);
    if (!task) {
      console.log(task);
      return res.status(404).json({ msg: `No Task with id ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
        res.status(404).json({ msg: "something went wrong" });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
};
