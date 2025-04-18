// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [sortField, setSortField] = useState('dueDate'); // default sort
    const [sortOrder, setSortOrder] = useState('asc');
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 1
    });

    const fetchTasks = (pageNumber) => {
        api.get('/tasks', {
            params: {
                page: pageNumber,
                size: size,
                sort: `${sortField},${sortOrder}`
            }
        })
            .then(res => {
                setTasks(res.data.content);
                setPage(res.data.number);
                setTotalPages(res.data.totalPages);
            })
            .catch(err => console.error('Failed to fetch tasks', err));
    };

    useEffect(() => {
        fetchTasks(0);
    }, [sortField, sortOrder]);

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === 'priority') {
            setSortField('priority');
            setSortOrder('desc'); // or 'asc'
        } else {
            setSortField('dueDate');
            setSortOrder('asc');
        }
    };

    const handleDeleteTask = (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            api.delete(`/tasks/${taskId}`)
                .then(() => {
                    // Refresh task list after successful deletion
                    fetchTasks(page);
                })
                .catch(err => console.error('Failed to delete task', err));
        }
    };

    const handleToggleComplete = (task) => {
        const updatedTask = { ...task, isCompleted: !task.isCompleted };

        api.put(`/tasks/${task.id}`, updatedTask)
            .then(() => {
                // Refresh task list after successful update
                fetchTasks(page);
            })
            .catch(err => console.error('Failed to update task status', err));
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description || '',
            dueDate: task.dueDate,
            priority: task.priority
        });
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            priority: 1
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmitUpdate = (e) => {
        e.preventDefault();

        const updatedTask = {
            ...editingTask,
            title: formData.title,
            description: formData.description,
            dueDate: formData.dueDate,
            priority: parseInt(formData.priority)
        };

        api.put(`/tasks/${editingTask.id}`, updatedTask)
            .then(() => {
                // Reset form and refresh task list after successful update
                handleCancelEdit();
                fetchTasks(page);
            })
            .catch(err => console.error('Failed to update task', err));
    };

    return (
        <div>
            <h2>Task List</h2>

            <div style={{ marginBottom: '1rem' }}>
                <label>Sort by: </label>
                <select onChange={handleSortChange} value={sortField}>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

            {editingTask && (
                <div style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h3>Edit Task</h3>
                    <form onSubmit={handleSubmitUpdate}>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Due Date:</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Priority (1-5):</label>
                            <input
                                type="number"
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                                min="1"
                                max="5"
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <button type="submit" style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                style={{ padding: '0.5rem 1rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {tasks.map(task => (
                    <li key={task.id} style={{
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: task.isCompleted ? '#f0f7f0' : 'white',
                        textDecoration: task.isCompleted ? 'line-through' : 'none',
                        opacity: task.isCompleted ? 0.7 : 1
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <strong>{task.title}</strong> <br />
                                {task.description && <div style={{ margin: '0.5rem 0' }}>{task.description}</div>}
                                Priority: {task.priority} <br />
                                Due: {task.dueDate} <br />
                                Posted: {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}
                            </div>
                            <div>
                                <button
                                    onClick={() => handleToggleComplete(task)}
                                    style={{
                                        marginRight: '0.5rem',
                                        padding: '0.25rem 0.5rem',
                                        backgroundColor: task.isCompleted ? '#f0ad4e' : '#5cb85c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px'
                                    }}
                                >
                                    {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                                <button
                                    onClick={() => handleEdit(task)}
                                    style={{
                                        marginRight: '0.5rem',
                                        padding: '0.25rem 0.5rem',
                                        backgroundColor: '#0275d8',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px'
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        backgroundColor: '#d9534f',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {tasks.length === 0 && (
                <p>No tasks found.</p>
            )}

            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={() => fetchTasks(page - 1)}
                    disabled={page <= 0}
                    style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}
                >
                    ← Previous
                </button>

                <span style={{ margin: '0 1rem' }}>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    onClick={() => fetchTasks(page + 1)}
                    disabled={page + 1 >= totalPages}
                    style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}