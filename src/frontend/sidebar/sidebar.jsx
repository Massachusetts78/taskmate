import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Star, Calendar, Check, X, CheckCircle } from 'lucide-react';
import './sidebar.css';

import ProfileDropdown from '../profile/profile.jsx';

const Sidebar = () => {
    const userId = localStorage.getItem('taskid');
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [user, setUser] = useState({ name: '', email: '' });
    const [activeTab, setActiveTab] = useState('tasks');
    const [selectedTask, setSelectedTask] = useState(null);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [taskChanges, setTaskChanges] = useState({});

    useEffect(() => {
        fetchTasks();
        fetchUser();
    }, [userId]);
    const handleLogout = () => {
        localStorage.removeItem('taskid');
        window.location.href = '/login';
    };

    const handleDeleteAccount = async () => {
        if (
            window.confirm(
                'Are you sure you want to delete your account? This action cannot be undone.',
            )
        ) {
            try {
                const response = await fetch(
                    `https://taskmate-backend-tmrk.onrender.com/delete-account/${userId}`,
                    {
                        method: 'DELETE',
                    },
                );

                if (response.ok) {
                    localStorage.removeItem('taskid');
                    window.location.href = '/';
                } else {
                    toast.error('Failed to delete account. Please try again.', {
                        autoClose: 3000,
                    });
                }
            } catch (err) {
                toast.error('An error occurred while deleting your account.', {
                    autoClose: 3000,
                });
            }
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await fetch(
                `https://taskmate-backend-tmrk.onrender.com/get-task/${userId}`,
            );
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            toast.error('Failed to fetch tasks. Please try again.', {
                autoClose: 3000,
            });
        }
    };

    const fetchUser = async () => {
        try {
            const res = await fetch(
                `https://taskmate-backend-tmrk.onrender.com/data/${userId}`,
            );
            const [data] = await res.json();
            setUser({ name: data.name, email: data.email });
        } catch (err) {
            toast.error('An error occurred while fetching user data.', {
                autoClose: 3000,
            });
        }
    };

    const addTask = async () => {
        if (newTask.trim()) {
            try {
                const task = {
                    taskName: newTask,
                    description: '',
                    dueDate: null,
                    completed: false,
                    important: false,
                };

                const response = await fetch(
                    `https://taskmate-backend-tmrk.onrender.com/create-task/${userId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(task),
                    },
                );

                if (response.ok) {
                    setNewTask('');
                    toast.success(
                        `Task "${task.taskName}" has been created successfully!`,
                        { autoClose: 2000 },
                    );
                    fetchTasks();
                } else {
                    toast.error('Error adding task. Please try again.', {
                        autoClose: 3000,
                    });
                }
            } catch (err) {
                toast.error('Failed to create task. Please try again.', {
                    autoClose: 3000,
                });
            }
        }
    };

    const toggleComplete = async (taskId) => {
        const updatedTask = tasks.find((task) => task._id === taskId);
        updatedTask.completed = !updatedTask.completed;

        try {
            await fetch(
                `https://taskmate-backend-tmrk.onrender.com/update-task/${taskId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ completed: updatedTask.completed }),
                },
            );

            if (updatedTask.completed) {
                toast.success(
                    `Congratulations! You've completed "${updatedTask.taskName}"`,
                    { autoClose: 2000 },
                );
            }

            fetchTasks();
        } catch (err) {
            toast.error('Error updating task.', { autoClose: 3000 });
        }
    };

    const toggleImportant = async (taskId) => {
        const updatedTask = tasks.find((task) => task._id === taskId);
        updatedTask.important = !updatedTask.important;

        try {
            await fetch(
                `https://taskmate-backend-tmrk.onrender.com/update-task/${taskId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ important: updatedTask.important }),
                },
            );
            fetchTasks();
        } catch (err) {
            toast.error('Error updating task importance.', { autoClose: 3000 });
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await fetch(
                `https://taskmate-backend-tmrk.onrender.com/delete-task/${taskId}`,
                {
                    method: 'DELETE',
                },
            );

            toast.success('Task has been deleted successfully.', {
                autoClose: 2000,
            });

            setSelectedTask(null);
            setIsRightSidebarOpen(false);
            fetchTasks();
        } catch (err) {
            toast.error('Error deleting task.', { autoClose: 3000 });
        }
    };

    const updateTaskField = (taskId, field, value) => {
        setTaskChanges((prev) => ({
            ...prev,
            [taskId]: {
                ...prev[taskId],
                [field]: value,
            },
        }));

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === taskId ? { ...task, [field]: value } : task,
            ),
        );

        setSelectedTask((prev) =>
            prev?._id === taskId ? { ...prev, [field]: value } : prev,
        );
    };

    const setDueDate = async (taskId, date) => {
        const formattedDate = newDate(date);
        updateTaskField(taskId, 'dueDate', formattedDate);
    };
    const newDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    const updateTaskdescription = (taskId, description) => {
        updateTaskField(taskId, 'description', description);
    };

    const getFilteredTasks = () => {
        switch (activeTab) {
            case 'important':
                return tasks.filter((task) => task.important);
            case 'planned':
                return tasks.filter((task) => task.dueDate);
            case 'completed':
                return tasks.filter((task) => task.completed);
            default:
                return tasks;
        }
    };

    const selectTask = (task) => {
        setSelectedTask(task);
        setIsRightSidebarOpen(true);
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const saveTaskDetails = async () => {
        if (selectedTask && taskChanges[selectedTask._id]) {
            try {
                const response = await fetch(
                    `https://taskmate-backend-tmrk.onrender.com/update-task/${selectedTask._id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(taskChanges[selectedTask._id]),
                    },
                );

                if (response.ok) {
                    setTaskChanges((prev) => {
                        const newChanges = { ...prev };
                        delete newChanges[selectedTask._id];
                        return newChanges;
                    });

                    toast.success(
                        'Task details have been updated successfully.',
                        { autoClose: 2000 },
                    );
                    setIsRightSidebarOpen(false);
                    fetchTasks();
                }
            } catch (err) {
                toast.error('Failed to save task details.', {
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <div className='todo-container'>
            {/* Left Sidebar */}
            <div className={`left-sidebar`}>
                <div className='sidebar-header'>
                    <ProfileDropdown
                        user={user}
                        onDeleteAccount={handleDeleteAccount}
                        onLogout={handleLogout}
                    />
                </div>

                <div className='nav-items'>
                    <div
                        className={`nav-item ${activeTab === 'tasks' ? 'active' : ''} tasks`}
                        onClick={() => setActiveTab('tasks')}
                    >
                        <div className='nav-item-icon'>
                            <Check size={20} />
                        </div>
                        Tasks
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'important' ? 'active' : ''} important`}
                        onClick={() => setActiveTab('important')}
                    >
                        <div className='nav-item-icon'>
                            <Star size={20} />
                        </div>
                        Important
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'planned' ? 'active' : ''} planned`}
                        onClick={() => setActiveTab('planned')}
                    >
                        <div className='nav-item-icon'>
                            <Calendar size={20} />
                        </div>
                        Planned
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'completed' ? 'active' : ''} completed`}
                        onClick={() => setActiveTab('completed')}
                    >
                        <div className='nav-item-icon'>
                            <CheckCircle size={20} />
                        </div>
                        Completed
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='main-content'>
                <div className='main-header'>
                    <h1 className='header-title'>
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h1>
                </div>

                <div className='add-task-section'>
                    <div className='add-task-container'>
                        <input
                            type='text'
                            className='add-task-input'
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTask()}
                            placeholder='Add a task'
                        />
                        <button
                            className='add-task-button'
                            onClick={addTask}
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className='tasks-container'>
                    {getFilteredTasks().map((task) => (
                        <div
                            key={task._id}
                            className={`task-item ${
                                selectedTask?.id === task._id ? 'selected' : ''
                            }`}
                            onClick={() => selectTask(task)}
                        >
                            <input
                                type='checkbox'
                                className='task-checkbox'
                                checked={task.completed}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    toggleComplete(task._id);
                                }}
                            />
                            <div className='task-content'>
                                <span
                                    className={`task-title ${
                                        task.completed ? 'completed' : ''
                                    }`}
                                >
                                    {task.taskName}
                                </span>
                                <div className='task-details'>
                                    {task.dueDate && (
                                        <span>
                                            Due {formatDate(task.dueDate)}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className='task-actions'>
                                <button
                                    className={`action-button ${
                                        task.important ? 'important' : ''
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleImportant(task._id);
                                    }}
                                >
                                    <Star size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <div
                className={`right-sidebar ${isRightSidebarOpen ? 'open' : ''}`}
            >
                {selectedTask && (
                    <>
                        <div className='right-sidebar-header'>
                            <h2>Task Details</h2>
                            <button
                                className='close-button'
                                onClick={() => setIsRightSidebarOpen(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className='task-details-content'>
                            <div className='detail-section'>
                                <div className='detail-label'>Title</div>
                                <input
                                    type='text'
                                    className='detail-input'
                                    value={selectedTask.taskName}
                                    onChange={(e) =>
                                        updateTaskField(
                                            selectedTask._id,
                                            'taskName',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className='detail-section'>
                                <div className='detail-label'>Description</div>
                                <textarea
                                    value={selectedTask.description || ''}
                                    className='detail-input'
                                    onChange={(e) =>
                                        updateTaskdescription(
                                            selectedTask._id,
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className='detail-section'>
                                <div className='detail-label'>Due Date</div>
                                <input
                                    type='date'
                                    className='detail-input'
                                    value={newDate(selectedTask?.dueDate) || ''}
                                    onChange={(e) =>
                                        setDueDate(
                                            selectedTask._id,
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className='task-actions'>
                                <button
                                    className='save-task'
                                    onClick={saveTaskDetails}
                                >
                                    Save Updates
                                </button>
                                <button
                                    className='delete-task'
                                    onClick={() => deleteTask(selectedTask._id)}
                                >
                                    Delete Task
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Sidebar;
