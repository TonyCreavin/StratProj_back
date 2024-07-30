import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken'; // Make sure to import jwt
import dotenv from 'dotenv'; // Make sure to import dotenv and configure it
import globalErrorHandler from './controllers/errorController.js';
import User from './models/userModel.js';
import userRouter from './routes/userRoute.js';
import Task from './models/taskModel.js';

import taskRouter from './routes/taskRoute.js';

dotenv.config();

const app = express();
app.use(express.json());
const secretKey = process.env.JWT_SECRET;

const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow credentials (cookies, headers)
};

app.use(cors(corsOptions));

// Middleware example to protect a route
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token)
    return res
      .status(401)
      .json({ status: 'error', message: 'Access denied. No token provided.' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ status: 'error', message: 'Invalid token.' });
    req.user = user;
    next();
  });
};

// Example route
app.post('/api/v1/users', authenticateToken, (req, res) => {
  // Your user registration logic here
  res
    .status(201)
    .json({ status: 'success', message: 'User registered successfully' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world!', app: 'StratProj' });
});

app.post('/api/v1/users/register', async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ status: 'success', token, data: { user: newUser } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});
//this is a test route
app.get('api/v1/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

export default app;
