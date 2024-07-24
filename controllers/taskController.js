import Task from '../models/taskModel.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find();
  res
    .status(200)
    .json({ status: 'success', results: tasks.length, data: { tasks } });
});

export const getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  res.status(200).json({ status: 'success', data: { task } });
});
export const createTask = catchAsync(async (req, res, next) => {
  const newTask = await Task.create(req.body);
  res.status(201).json({ status: 'success', data: { task: newTask } });
});
export const updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ status: 'success', data: { task } });
});
export const deleteTask = catchAsync(async (req, res, next) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: 'success', message: 'Task deleted' });
});
