// src/App.js
import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import WeatherWidget from './components/WeatherWidget';
import UserFrom from './components/UserFrom';
import UserList from './components/UserList';

function App() {
  return (
      <div style={{ padding: '2rem' }}>
        <h1>Task Manager</h1>
        <TaskForm />
        <hr />
        <TaskList />
        <hr />
        <WeatherWidget />
          <hr />
          <UserFrom />
          <hr />
          <UserList/>
      </div>
  );
}

export default App;
