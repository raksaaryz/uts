// src/AddStudentForm.js
import React, { useState, useEffect } from 'react';
import './AddStudentForm.css';

const AddStudentForm = ({ onAddStudent, onUpdateStudent, editableStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    major: '',
    gpa: ''
  });

  useEffect(() => {
    if (editableStudent) {
      setFormData(editableStudent);
    }
  }, [editableStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editableStudent) {
      onUpdateStudent({
        ...formData,
        age: parseInt(formData.age),
        gpa: parseFloat(formData.gpa)
      });
    } else {
      onAddStudent({
        ...formData,
        age: parseInt(formData.age),
        gpa: parseFloat(formData.gpa)
      });
    }
    setFormData({
      name: '',
      age: '',
      major: '',
      gpa: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nama: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Umur: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Jurusan: </label>
        <input
          type="text"
          name="major"
          value={formData.major}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>IPK: </label>
        <input
          type="number"
          step="0.01"
          name="gpa"
          value={formData.gpa}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{editableStudent ? 'Update' : 'Tambah'} Mahasiswa</button>
    </form>
  );
};

export default AddStudentForm;
