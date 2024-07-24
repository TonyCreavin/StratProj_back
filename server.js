import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app.js';

const DB = process.env.DATABASE_URL;

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => console.log('DB connection error:', err));

// app.get('/', (req, res) => {
//   res.json({ message: 'Hello World!', app: 'Strategin' });
// });
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
