import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function StudentEdit() {
  let { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [inputErrorList, setInputErrorList] = useState({});
  const [student, setStudent] = useState({
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/student/show/${id}`)
      .then((res) => {
        console.log(res.data);
        setStudent(res.data.student);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setLoading(false);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
            setLoading(false);
          }
        }
      });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      name: student.name,
      phone: student.phone,
      email: student.email,
    };

    console.log(data); // Check the data before sending

    axios
      .put(`http://127.0.0.1:8000/api/student/edit/${id}`, data)
      .then((res) => {
        console.log(res.data);
        alert("success");
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            console.log(error.response.data.message);
            setInputErrorList(error.response.data.message);
          } else if (error.response.status === 500) {
            console.log(error.response.data);
            alert('500');
          } else {
            console.log(error.response.data);
          }
        } else {
          console.log(error);
        }
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Edit Student Information
                <Link className="btn btn-warning float-end" to="/student">
                  Back
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={updateStudent}>
                <div className="form-group mb-3">
                  <label>Student Name</label>
                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.email}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={student.phone}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.phone}</span>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-success">
                    Update Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentEdit;
