import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: { users } });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ status: 'success', data: { user } });
});

export const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ status: 'success', data: { user: newUser } });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ status: 'success', data: { user } });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: 'success', message: 'User deleted' });
});
