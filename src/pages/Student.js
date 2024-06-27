import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

function Student() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/student');
      if (response.data && Array.isArray(response.data.student)) {
        setStudents(response.data.student);
        setLoading(false);
        setError(null);
      } else {
        setError('Invalid data format received from API.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch student data. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/student/del/${id}`);
      if (response.status === 200) {
        // Update students state to remove the deleted student
        setStudents(students.filter(student => student.id !== id));
        // Optionally, show a success message or perform any other action
      } else {
        setError(`Failed to delete student: ${response.data.message}`);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to delete student. Please try again later.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  const studentDetails = students.map((item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>
        <Link to={`/student/${item.id}/edit`} className="btn btn-sm btn-success">Edit</Link>
      </td>
      <td>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>Student List</h4>
              <Link to="/student/create" className="btn btn-sm btn-primary float-end">Add Student</Link>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {studentDetails}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
