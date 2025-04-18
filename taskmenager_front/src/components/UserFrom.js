import React, { useState } from 'react';
import api from '../api';

export default function UserForm() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState(null);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await api.post('/users/register', form);
            setMessage(`User "${res.data.username}" created (ID ${res.data.id})`);
            setForm({ username: '', email: '', password: '' });
        } catch (err) {
            console.error(err);
            setMessage('Error creating user');
        }
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
