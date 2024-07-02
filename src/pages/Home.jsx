import { useState } from "react";
import AddStudentForm from "../components/AddStudentForm";
import { useEffect } from "react";

export default function Home() {
  const studentsData = [
    {
      id: 1,
      name: "Ahmad",
      age: 21,
      major: "Informatika",
      gpa: 3.8,
    },
    {
      id: 2,
      name: "Budi",
      age: 22,
      major: "Teknik Elektro",
      gpa: 3.5,
    },
    {
      id: 3,
      name: "Citra",
      age: 20,
      major: "Manajemen",
      gpa: 3.9,
    },
  ];
  const storedStudents = localStorage.getItem("studentsData");

  const [students, setStudents] = useState(
    // kondisi kalau kosong atau tidak
    storedStudents ? JSON.parse(storedStudents) : studentsData
  );
  const [editableStudent, setEditableStudent] = useState(null);

  // untuk search
  const [searchTerm, setSearchTerm] = useState("");

  // untuk sort
  const [sortKey, setSortKey] = useState("");

  //  simpan ke local storage
  useEffect(() => {
    localStorage.setItem("studentsData", JSON.stringify(students));
  }, [students]);

  // BUAT TAMBAH DATA
  const addStudent = (newStudent) => {
    setStudents([...students, { ...newStudent, id: students.length + 1 }]);
  };

  // UPDATE DATA
  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setEditableStudent(null);
  };

  // DELETE DATA
  const deleteStudent = (studentId) => {
    setStudents(students.filter((student) => student.id !== studentId));
  };

  // EDIT DATA
  const editStudent = (student) => {
    setEditableStudent(student);
  };

  // buat search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    setSortKey(key);
    let sortedStudents = [...students];
    sortedStudents.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setStudents(sortedStudents);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Daftar Mahasiswa</h1>
        <AddStudentForm
          onAddStudent={addStudent}
          onUpdateStudent={updateStudent}
          editableStudent={editableStudent}
        />
        <div>
          <input
            type="text"
            placeholder="Cari mahasiswa..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={() => handleSort("id")}>Sort by ID</button>
          <button onClick={() => handleSort("name")}>Sort by Nama</button>
          <button onClick={() => handleSort("age")}>Sort by Umur</button>
          <button onClick={() => handleSort("major")}>Sort by Jurusan</button>
          <button onClick={() => handleSort("gpa")}>Sort by IPK</button>
        </div>  
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Umur</th>
              <th>Jurusan</th>
              <th>IPK</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.major}</td>
                <td>{student.gpa}</td>
                <td>
                  <button onClick={() => editStudent(student)}>Edit</button>
                  <button onClick={() => deleteStudent(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
