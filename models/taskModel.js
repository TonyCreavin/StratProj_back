import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  progress: { type: Number, required: true },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
