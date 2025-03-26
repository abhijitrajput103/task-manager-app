import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const Home = () => {
    const [uid, setuId] = useState("");
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    // Create Task
    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const taskData = { uid, title: task, description };
            const { data } = await axios.post("http://localhost:8000/api/v1/tasks/create", taskData);
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success("Task created successfully");
                setTasks([...tasks, data.task]);
                setTask("");
                setDescription("");
                setIsModalVisible(false);
            }
        } catch (error) {
            toast.error("Task Not Created");
        }
    };

    // Get All Tasks
    const getAllTasks = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:8000/api/v1/tasks/getAllTasks");
            setTasks(data.task);
        } catch (error) {
            console.error("Fetch tasks error:", error);
            toast.error("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllTasks();
    }, []);

    // Delete Task
    const handleDelete = async (id) => {
        try {
            let answer = window.prompt("Are You Sure want to delete this task?");
            if (!answer) return;
            const { data } = await axios.delete(`http://localhost:8000/api/v1/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
            toast.success("Task Deleted Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Update Task
    const openUpdateModal = (task) => {
        setCurrentTask(task);
        setTask(task.title);
        setDescription(task.description);
        setUpdateModalVisible(true);
    };

    // Handle Update
    const handleStatusUpdate = async (id, completed) => {
        try {
            const { data } = await axios.put(`http://localhost:8000/api/v1/tasks/${id}/status`, { completed });
            if (data && data.task) {
                setTasks(tasks.map((t) => (t._id === id ? { ...t, completed } : t)));
                toast.success("Task status updated successfully");
            } else {
                toast.error("Failed to update task status");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const id = currentTask._id;
        try {
            const taskData = { title: task, description };
            const { data } = await axios.put(`http://localhost:8000/api/v1/tasks/${id}`, taskData);
            if (data && data._id) {
                toast.success("Task updated successfully");
                setTasks(tasks.map((t) =>
                    t._id === id ? { ...t, title: task, description } : t
                ));
                setTask("");
                setDescription("");
                setCurrentTask(null);
                setUpdateModalVisible(false);
            } else {
                toast.error("Failed to update task");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // Update Status
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const updatedTask = { completed: !currentStatus };
            await axios.put(`http://localhost:8000/api/v1/tasks/${id}`, updatedTask);
            setTasks(tasks.map((task) =>
                task._id === id ? { ...task, completed: !currentStatus } : task
            ));
            toast.success("Task status updated");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 min-h-screen">
                <div className="max-w-4xl mx-auto p-6 bg-amber-100 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Task Manager App</h1>
                    <button
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                        onClick={showModal}
                    >
                        Create Task
                    </button>

                    {/* Create Task Modal */}
                    <Modal
                        title={<span className="text-xl font-semibold text-gray-800">Create Task</span>}
                        open={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        className="rounded-lg"
                    >
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="id">
                                    Task ID
                                </label>
                                <input
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    id="id"
                                    type="text"
                                    placeholder="Enter Unique Task ID e.g, 1,2,3"
                                    value={uid}
                                    onChange={(e) => setuId(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Task Title</label>
                                <input
                                    type="text"
                                    value={task}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setTask(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Task Description</label>
                                <textarea
                                    value={description}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                                >
                                    CREATE TASK
                                </button>
                            </div>
                        </form>
                    </Modal>

                    {/* Task List */}
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">List of Tasks</h2>
                    {loading ? (
                        <p className="text-center text-gray-500 animate-pulse">Loading tasks...</p>
                    ) : tasks.length > 0 ? (
                        tasks.map((t) => (
                            <div key={t._id} className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Unique Task ID: <span className="text-indigo-600">{t.uid}</span></h3>
                                <h3 className="text-xl font-bold text-gray-800 mt-2">Task: <span className="text-gray-700">{t.title}</span></h3>
                                <p className="text-base text-gray-600 mt-2">
                                    Description: <span className="text-gray-700">{t.description}</span>
                                </p>
                                <p className="text-sm mt-2">
                                    Status:
                                    <span className={`ml-2 px-2 py-1 rounded-full text-white ${t.completed ? "bg-green-500" : "bg-red-500"}`}>
                                        {t.completed ? "Completed" : "Pending"}
                                    </span>
                                </p>
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        className={`px-4 py-2 rounded-lg shadow-sm transition-all ${t.completed ? "bg-gray-500 text-white" : "bg-green-500 text-white hover:bg-green-600"}`}
                                        onClick={() => handleToggleStatus(t._id, t.completed)}
                                    >
                                        {t.completed ? "Mark as Pending" : "Mark as Completed"}
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition-all"
                                        onClick={() => openUpdateModal(t)}
                                    >
                                        UPDATE TASK
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-600 transition-all"
                                        onClick={() => handleDelete(t._id)}
                                    >
                                        DELETE TASK
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No tasks found.</p>
                    )}
                </div>
            </div>

            {/* Update Task Modal */}
            <Modal
                title={<span className="text-xl font-semibold text-gray-800">Update Task</span>}
                open={updateModalVisible}
                onCancel={() => {
                    setUpdateModalVisible(false);
                    setCurrentTask(null);
                }}
                footer={null}
                className="rounded-lg"
            >
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Task Title</label>
                        <input
                            type="text"
                            value={task}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => setTask(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Task Description</label>
                        <textarea
                            value={description}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                        >
                            UPDATE TASK
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Home;