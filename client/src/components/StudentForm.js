import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ student, onSubmit }) => {
  const [formData, setFormData] = useState({ id: '', name: '', major: '' });

  useEffect(() => {
    if (student) {
      setFormData({ id: student.id, name: student.name, major: student.major });
    } else {
      setFormData({ id: '', name: '', major: '' });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (student) {
        await axios.patch(`${process.env.REACT_APP_API_URL}/students/${formData.id}`, {
          name: formData.name,
          major: formData.major,
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/students`, formData);
      }
      setFormData({ id: '', name: '', major: '' });
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="ID"
        required
        disabled={!!student}
        style={{ margin: '5px', padding: '5px' }}
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        style={{ margin: '5px', padding: '5px' }}
      />
      <input
        type="text"
        name="major"
        value={formData.major}
        onChange={handleChange}
        placeholder="Major"
        required
        style={{ margin: '5px', padding: '5px' }}
      />
      <button type="submit" style={{ margin: '5px', padding: '5px 10px' }}>
        {student ? 'Update' : 'Add'} student
      </button>
    </form>
  );
};

export default StudentForm;