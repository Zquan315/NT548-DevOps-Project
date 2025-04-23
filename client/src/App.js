import React from 'react';
import StudentList from './components/StudentList';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <StudentList />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;