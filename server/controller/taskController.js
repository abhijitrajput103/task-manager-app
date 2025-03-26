import { log } from 'console';
import Task from '../models/taskModel.js';


// Create a new task
export const createTask = async (req, res) => {
  try {
    const { uid,title, description=" ",completed = false } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    
    const task = new Task({
      uid,
      title,
      description,
      completed,
    });
    
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(200).send({
      success: true,
      message: "All Tasks List",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Tasks",
    });
  }
};

// Get a single task
export const getTaskById = async (req, res) => {
  try {
    console.log(req.params);
    
    const { id } = req.params;
    const task = await Task.findById(id);
    console.log(task);
    
    res.status(200).send({
      success: true,
      message: " Got Single Task Successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Task",
    });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        completed
      },
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Task",
      error,
    });
  }
};

//Update Status
export const updateStatus = async (req, res) => {
  try {
      const { id } = req.params;
      const { completed } = req.body;

      if (typeof completed !== 'boolean') {
          return res.status(400).json({ success: false, message: "Invalid 'completed' value" });
      }

      const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });

      if (!updatedTask) {
          return res.status(404).json({ success: false, message: "Task not found" });
      }

      res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};