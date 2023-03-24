package com.example.pailab4.interfaces;

import com.example.pailab4.entities.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {
}
