// src/components/TaskForm.js
import React, { useState } from 'react';
import api from '../api';

export default function TaskForm() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        due_date: '',
        priority: 1,
        user_id: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await api.post('/tasks', form);
            alert('Task created!');
        } catch (err) {
            console.error(err);
            alert('Error creating task.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Task</h2>
            <input name="title" placeholder="Title" onChange={handleChange} />
            <input name="description" placeholder="Description" onChange={handleChange} />
            <input name="due_date" type="date" onChange={handleChange} />
            <input name="priority" type="number" onChange={handleChange} />
            <input name="user_id" type="number" placeholder="User ID" onChange={handleChange} />
            <button type="submit">Create Task</button>
        </form>
    );
}
