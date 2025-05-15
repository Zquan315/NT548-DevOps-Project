import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';
import { toast } from 'react-toastify';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Error fetching students!');
    }
  };

  const deleteStudent = async (id) => {
    try {
      console.log('Deleting student with ID:', id);
      await axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`);
      fetchStudents();
      toast.success(`Deleted Student ${id}!`);
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Error deleting student!');
    }
  };

  const editStudent = (student) => {
    setEditingStudent(student);
  };

  const handleFormSubmit = () => {
    setEditingStudent(null);
    fetchStudents();
    toast.success(editingStudent ? 'Updated student successfully!' : 'Added a student successfully!');
  };

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm student={editingStudent} onSubmit={handleFormSubmit} />
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Major</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.major}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => editStudent(student)}
                style={{
                    marginRight: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#28a745', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}>Edit</button>
                  
                <button onClick={() => deleteStudent(student.id)}
                style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545', // Màu đỏ cho Delete
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;