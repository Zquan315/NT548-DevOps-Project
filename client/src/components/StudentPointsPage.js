import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Để lấy ID từ URL
import { toast } from 'react-toastify';

const StudentPointsPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [student, setStudent] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [subjectScore, setSubjectScore] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  useEffect(() => {
    fetchStudent(id);
  }, [id]);

  // Lấy thông tin sinh viên
  const fetchStudent = async (studentId) => {
    setLoading(true); // Bắt đầu tải dữ liệu
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/students/${studentId}`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
      toast.error('Error fetching student!');
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };

  // Xử lý thêm môn học và điểm
  const handleSubmit = async () => {
    if (!subjectName || subjectScore <= 0) {
      toast.error('Please provide a valid subject name and score!');
      return;
    }

    const subjectData = { name: subjectName, score: parseFloat(subjectScore) };
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/students/${id}/subjects`, subjectData);
      toast.success('Subject added successfully!');
      setStudent(response.data); // Cập nhật lại thông tin sinh viên sau khi thêm môn học
      setSubjectName('');
      setSubjectScore('');
    } catch (error) {
      console.error('Error adding subject score:', error);
      toast.error('Error adding subject score!');
    }
  };

  return (
    <div>
      <h1>Enter Points for Student {student ? student.name : ''}</h1>

      {loading && <div>Loading student data...</div>} {/* Hiển thị khi đang tải dữ liệu */}

      {student && !loading && (
        <div>
          <h3>Subjects</h3>
          <ul>
            {student.subjects && student.subjects.length > 0 ? (
              student.subjects.map((subject, index) => (
                <li key={index}>
                  {subject.name}: {subject.score}
                </li>
              ))
            ) : (
              <p>No subjects available</p>
            )}
          </ul>

          <div>
            <h3>Add New Subject</h3>
            <input
              type="text"
              placeholder="Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Subject Score"
              value={subjectScore}
              onChange={(e) => setSubjectScore(e.target.value)}
            />
            <button onClick={handleSubmit}>Add Subject</button>
          </div>
        </div>
      )}

      {!student && !loading && <div>Student not found.</div>} {/* Nếu không tìm thấy sinh viên */}
    </div>
  );
};

export default StudentPointsPage;
