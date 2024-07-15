package com.example.demo.service.impl;


import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;


import org.springframework.stereotype.Service;

import com.example.demo.dto.EmployeeDto;
import com.example.demo.entity.Employee;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.EmployeeMapper;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;

import lombok.AllArgsConstructor;




@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{
	
	private final EmployeeRepository employeeRepository;
	
	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		 if (employeeRepository.existsById(employeeDto.getId())) {
		        throw new RuntimeException("Teacher with ID " + employeeDto.getId() + " already exists.");
		    }
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public EmployeeDto getEmployeeById(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId)
		   .orElseThrow(() -> new ResourceNotFoundException("Teacher is not exists with given id : "+ employeeId));
		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		List<Employee> employees = employeeRepository.findAll();
		return employees.stream().map((employee) ->EmployeeMapper.mapToEmployeeDto(employee))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() ->
		new ResourceNotFoundException("Teacher is not exists with given id : " + employeeId));
		
		employee.setName(updatedEmployee.getName());
		employee.setGender(updatedEmployee.getGender());
		employee.setContactNumber(updatedEmployee.getContactNumber());
		employee.setEmail(updatedEmployee.getEmail());
		employee.setPassword(updatedEmployee.getPassword());
		employee.setAddress(updatedEmployee.getAddress());
		employee.setArea(updatedEmployee.getArea());
		employee.setInstitution(updatedEmployee.getInstitution());
		employee.setDepartment(updatedEmployee.getDepartment());
		employee.setYear(updatedEmployee.getYear());
		employee.setPreferance(updatedEmployee.getPreferance());
		employee.setCariculam(updatedEmployee.getCariculam());
		
		Employee updatedEmployeeObj = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
	}

	@Override
	public void deleteEmployee(Long employeeId) {
		employeeRepository.findById(employeeId).orElseThrow(() ->
		new ResourceNotFoundException("Teacher is not exists with given id : " + employeeId));
		
		employeeRepository.deleteById(employeeId);
		
	}
	
	@Override
	public EmployeeDto getEmployeeByContactNumber(String contactNumber) {
	    Optional<Employee> employee = employeeRepository.findByContactNumber(contactNumber);
	    if (employee.isPresent()) {
	        return EmployeeMapper.mapToEmployeeDto(employee.get());
	    } else {
	        throw new ResourceNotFoundException("Employee not found with contact number: " + contactNumber);
	    }
	}
	
	@Override
	public EmployeeDto getEmployeeByEmail(String email) {
	    Optional<Employee> employee = employeeRepository.findByEmail(email);
	    if (employee.isPresent()) {
	        return EmployeeMapper.mapToEmployeeDto(employee.get());
	    } else {
	        throw new ResourceNotFoundException("Employee not found with contact number: " + email);
	    }
	}
	

	@Override
	public List<EmployeeDto> searchEmployees(String institution, String gender, String cariculam) {
	    List<Employee> matchingEmployees = employeeRepository.findByInstitutionAndGenderAndCariculam(institution, gender, cariculam);
	    return matchingEmployees.stream()
	            .map(EmployeeMapper::mapToEmployeeDto)
	            .limit(10) 
	            .collect(Collectors.toList());
	}


//  #Optional don't take .orElseThrow syntax.
//	@Override
//	public EmployeeDto getEmployeeByEmail(String email) {
//		Employee employee = employeeRepository.findByEmail(email)
//				   .orElseThrow(() -> new ResourceNotFoundException("Teacher is not exists with given Email : "+ email));
//				return EmployeeMapper.mapToEmployeeDto(employee);
//	}
}
