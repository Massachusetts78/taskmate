import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Star, Calendar, Check, X, CheckCircle } from 'lucide-react';
import './sidebar.css';

import { NotificationService } from '../../backend/utils/notification.js';
import { ReminderChecker } from '../../backend/utils/reminder.js';

const Sidebar = () => {
    const userId = localStorage.getItem('taskid');
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [user, setUser] = useState({ name: '', email: '' });
    const [activeTab, setActiveTab] = useState('tasks');
    const [selectedTask, setSelectedTask] = useState(null);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [taskChanges, setTaskChanges] = useState({});
    const [reminderChecker] = useState(() => new ReminderChecker());
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        const setupNotifications = async () => {
            const hasPermission = await NotificationService.requestPermission();
            setNotificationsEnabled(hasPermission);
        };

        setupNotifications();
        fetchTasks();
        fetchUser();

        return () => {
            reminderChecker.clearAllReminders();
        };
    }, [userId, reminderChecker, notificationsEnabled]);

    useEffect(() => {
        if (notificationsEnabled) {
            tasks.forEach((task) => {
                if (!task.completed) {
                    reminderChecker.scheduleReminder(task);
                }
            });
        }
    }, [tasks, notificationsEnabled]);

    const fetchTasks = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/get-task/${userId}`,
            );
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            toast.error('Failed to fetch tasks. Please try again.');
        }
    };

    const fetchUser = async () => {
        try {
            const res = await fetch(`http://localhost:3000/data/${userId}`);
            const [data] = await res.json();
            setUser({ name: data.name, email: data.email });
        } catch (err) {
            toast.error('An error occurred while fetching user data.');
        }
    };

    const addTask = async () => {
        if (newTask.trim()) {
            try {
                const task = {
                    taskName: newTask,
                    description: '',
                    dueDate: null,
                    reminder: null,
                    completed: false,
                    important: false,
                };

                const response = await fetch(
                    `http://localhost:3000/create-task/${userId}`,
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
                    );
                    fetchTasks();
                } else {
                    toast.error('Error adding task. Please try again.');
                }
            } catch (err) {
                toast.error('Failed to create task. Please try again.');
            }
        }
    };

    const toggleComplete = async (taskId) => {
        const updatedTask = tasks.find((task) => task._id === taskId);
        updatedTask.completed = !updatedTask.completed;

        try {
            await fetch(`http://localhost:3000/update-task/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: updatedTask.completed }),
            });

            if (updatedTask.completed) {
                reminderChecker.clearReminder(taskId);
                toast.success(
                    `Congratulations! You've completed "${updatedTask.taskName}"`,
                );
            } else {
                if (updatedTask.dueDate || updatedTask.reminder) {
                    reminderChecker.scheduleReminder(updatedTask);
                }
            }

            fetchTasks();
        } catch (err) {
            toast.error('Error updating task.');
        }
    };

    const toggleImportant = async (taskId) => {
        const updatedTask = tasks.find((task) => task._id === taskId);
        updatedTask.important = !updatedTask.important;

        try {
            await fetch(`http://localhost:3000/update-task/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ important: updatedTask.important }),
            });
            fetchTasks();
        } catch (err) {
            toast.error('Error updating task importance.');
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await fetch(`http://localhost:3000/delete-task/${taskId}`, {
                method: 'DELETE',
            });

            reminderChecker.clearReminder(taskId);
            toast.success('Task has been deleted successfully.');

            setSelectedTask(null);
            setIsRightSidebarOpen(false);
            fetchTasks();
        } catch (err) {
            toast.error('Error deleting task.');
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
        updateTaskField(taskId, 'dueDate', date);

        const task = tasks.find((t) => t._id === taskId);
        if (task && !task.completed && notificationsEnabled) {
            reminderChecker.scheduleReminder({
                ...task,
                dueDate: date,
            });
        }
    };

    const setTaskreminder = async (taskId, reminderTime) => {
        updateTaskField(taskId, 'reminder', reminderTime);

        const task = tasks.find((t) => t._id === taskId);
        if (task && !task.completed && notificationsEnabled) {
            reminderChecker.scheduleReminder({
                ...task,
                reminder: reminderTime,
            });
        }
    };

    const updateTaskdescription = (taskId, description) => {
        updateTaskField(taskId, 'description', description);
    };

    const getFilteredTasks = () => {
        switch (activeTab) {
            case 'important':
                return tasks.filter((task) => task.important);
            case 'planned':
                return tasks.filter((task) => task.dueDate || task.reminder);
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
                    `http://localhost:3000/update-task/${selectedTask._id}`,
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
                    );
                    setIsRightSidebarOpen(false);
                    fetchTasks();
                }
            } catch (err) {
                toast.error('Failed to save task details.');
            }
        }
    };

    return (
        <div className='todo-container'>
            {/* Left Sidebar */}
            <div className={`left-sidebar`}>
                <div className='sidebar-header'>
                    <span className='user-class'>
                        {user.name ? user.name.charAt(0).toUpperCase() : ''}
                    </span>
                    <span className='app-name'>Taskmate</span>
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
                                    {task.reminder && <span>reminder set</span>}
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
                                    value={selectedTask?.dueDate || ''}
                                    onChange={(e) =>
                                        setDueDate(
                                            selectedTask._id,
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className='detail-section'>
                                <div className='detail-label'>Reminder</div>
                                <input
                                    type='datetime-local'
                                    className='detail-input'
                                    value={selectedTask.reminder || ''}
                                    onChange={(e) =>
                                        setTaskreminder(
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
