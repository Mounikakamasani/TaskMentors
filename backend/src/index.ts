import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import mentorsRouter from './routes/mentors.js';
import tasksRouter from './routes/tasks.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/arqonz';
const port = Number(process.env.PORT || 4000);

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/mentors', mentorsRouter);
app.use('/api/tasks', tasksRouter);


