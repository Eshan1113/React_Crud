import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Student from '../pages/Student'; 
import Studentcreate from '../pages/Studentcreate'
import StudentEdit from '../pages/StudentEdit';

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/student" element={<Student />} /> 
      <Route path="/student/create" element={<Studentcreate />} /> 
      <Route path="/student/:id/edit" element={<StudentEdit />} />
      
      
    </Routes>
  );
}

export default MyRouter;
