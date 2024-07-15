package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EmployeeDto;
import com.example.demo.service.EmployeeService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	private EmployeeService employeeService;
	

	@PostMapping
	public ResponseEntity <EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto)
	{
		
		EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto); 
		return new ResponseEntity<> (savedEmployee, HttpStatus.CREATED);
	}


	@GetMapping("{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
		EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
		return ResponseEntity.ok(employeeDto);
	}
	
	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
		List<EmployeeDto> employees = employeeService.getAllEmployees();
		return ResponseEntity.ok(employees);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,@RequestBody EmployeeDto updateEmployee){
		EmployeeDto employeeDto = employeeService.updateEmployee(employeeId, updateEmployee);
		return ResponseEntity.ok(employeeDto);
	}
	
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteEmployeee(@PathVariable("id") Long employeeId)
	{
		employeeService.deleteEmployee(employeeId);
		return ResponseEntity.ok("Teacher deleted successfully!");
	}
	
	@GetMapping("/contactNumber/{contactNumber}")
	public ResponseEntity<EmployeeDto> getEmployeeByPhoneNumber(@PathVariable("contactNumber") String contactNumber) {
	    EmployeeDto employees = employeeService.getEmployeeByContactNumber(contactNumber);
	    return ResponseEntity.ok(employees);
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<EmployeeDto> getEmployeeByEmail(@PathVariable("email") String email) {
	    EmployeeDto employees = employeeService.getEmployeeByEmail(email);
	    return ResponseEntity.ok(employees);
	}
	
	
	@GetMapping("/search")
	public ResponseEntity<List<EmployeeDto>> searchEmployees(@RequestParam("institution") String institution,
	                                                        @RequestParam("gender") String gender,
	                                                        @RequestParam("cariculam") String cariculam) {
	    List<EmployeeDto> matchingEmployees = employeeService.searchEmployees(institution, gender, cariculam);
	    return ResponseEntity.ok(matchingEmployees);
	}


}
