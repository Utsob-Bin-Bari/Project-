package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    Optional<Employee> findByContactNumber(String contactNumber);
    Optional<Employee> findByEmail(String email);
    List<Employee> findByInstitutionAndGenderAndCariculam(String institution, String gender, String cariculam);


}
