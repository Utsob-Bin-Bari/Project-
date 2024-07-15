package com.example.demo.repository;




import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long>{


Optional<Student> findByStudentContactNumber(String studentContactNumber);

Optional<Student> findByStudentEmail(String studentEmail);

	

}
