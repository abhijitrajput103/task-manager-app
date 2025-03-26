import express from 'express';
import cors from 'cors'; // Import CORS middleware

import mongoose  from 'mongoose';
import taskRoutes from './router/taskRouter.js';
import dotenv from 'dotenv';
import connectDB  from './db.js';
import 'colors';

const app = express();
dotenv.config({ path: './config.env' });
app.use(cors()); // Enable CORS for all routes

app.use(express.json());
connectDB();

app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on  mode on port ${PORT}`.bgCyan.white
  );
});
