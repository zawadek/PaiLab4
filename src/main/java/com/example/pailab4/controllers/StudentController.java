package com.example.pailab4.controllers;

import com.example.pailab4.entities.Student;
import com.example.pailab4.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/students")
    public List<Student> getAll() {
        return studentService.getStudentList();
    }

    @PostMapping("/student/add")
    public Boolean addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @DeleteMapping("/student/delete/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        return studentService.deleteStudent(id);
    }

    @PutMapping("/student/update/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @GetMapping("/student/get/{id}")
    public Student getStudent(@PathVariable Long id) {
        return studentService.getOneById(id).get();
    }

}
