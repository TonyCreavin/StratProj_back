import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
