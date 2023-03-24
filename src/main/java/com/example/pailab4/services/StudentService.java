package com.example.pailab4.services;

import com.example.pailab4.entities.Student;
import com.example.pailab4.interfaces.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getStudentList() {
        return (List<Student>) studentRepository.findAll();
    }

    public Boolean addStudent(Student student) {
        try {
            studentRepository.save(student);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    public ResponseEntity<String> deleteStudent(Long id) {
        Optional<Student> student = studentRepository.findById(id);

        if (student.isPresent()) {
            studentRepository.deleteById(id);
            return ResponseEntity.ok("Student with id " + id + " was deleted.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Student with id " + id + " does not exist.");
        }
    }

    public ResponseEntity<String> updateStudent(Long id, Student student) {
        Optional<Student> existingStudent = studentRepository.findById(id);

        if (existingStudent.isPresent()) {
            Student updatedStudent = existingStudent.get();
            updatedStudent.setName(student.getName());
            updatedStudent.setSurname(student.getSurname());
            updatedStudent.setAverage(student.getAverage());
            studentRepository.save(updatedStudent);
            return ResponseEntity.ok("Student with id " + id + " was updated.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Student with id " + id + " does not exist.");
        }
    }

    public Optional<Student> getOneById(Long id) {
        return studentRepository.findById(id);
    }
}
