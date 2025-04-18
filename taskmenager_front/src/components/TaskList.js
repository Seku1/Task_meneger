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

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> <br />
                        Priority: {task.priority} <br />
                        Due: {task.dueDate} <br />
                        Posted: {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: '1rem' }}>
                <button onClick={() => fetchTasks(page - 1)} disabled={page <= 0}>
                    ← Previous
                </button>

                <span style={{ margin: '0 1rem' }}>
          Page {page + 1} of {totalPages}
        </span>

                <button onClick={() => fetchTasks(page + 1)} disabled={page + 1 >= totalPages}>
                    Next →
                </button>
            </div>
        </div>
    );
}
