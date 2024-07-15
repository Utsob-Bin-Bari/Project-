package com.example.demo.service;

import java.util.List;
import com.example.demo.dto.EmployeeDto;

public interface EmployeeService {
	EmployeeDto createEmployee(EmployeeDto employeeDto);
	
	EmployeeDto getEmployeeById(Long employeeId);
	
	List<EmployeeDto> getAllEmployees();
	
	EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);
	
	void deleteEmployee(Long employeeId);
	
    EmployeeDto getEmployeeByContactNumber(String contactNumber);
    
    EmployeeDto getEmployeeByEmail(String email);

    List<EmployeeDto> searchEmployees(String institution, String gender, String cariculam);

} 
