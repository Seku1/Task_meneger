import React, { useEffect, useState } from 'react';
import api from '../api';

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error('Failed to load users', err));
    }, []);

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2>Registered Users</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul>
                    {users.map(u => (
                        <li key={u.id}>
                            <strong>{u.username}</strong> ({u.email})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
