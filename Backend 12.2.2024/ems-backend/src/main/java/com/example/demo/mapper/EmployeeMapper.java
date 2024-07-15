package com.example.demo.mapper;

import com.example.demo.dto.EmployeeDto;
import com.example.demo.entity.Employee;

public class EmployeeMapper {
	
	public static EmployeeDto mapToEmployeeDto(Employee employee)
	{
		return new EmployeeDto(
				employee.getId(),
				employee.getName(),
				employee.getGender(),
				employee.getContactNumber(),
				employee.getEmail(),
				employee.getPassword(),
				employee.getAddress(),
				employee.getArea(),
				employee.getInstitution(),
				employee.getDepartment(),
				employee.getYear(),
				employee.getPreferance(),
				employee.getCariculam()
				);
	}
	
	public static Employee mapToEmployee(EmployeeDto employeeDto)
	{
		return new Employee(
				employeeDto.getId(),
				employeeDto.getName(),
				employeeDto.getGender(),
				employeeDto.getContactNumber(),
				employeeDto.getEmail(),
				employeeDto.getPassword(),
				employeeDto.getAddress(),
				employeeDto.getArea(),
				employeeDto.getInstitution(),
				employeeDto.getDepartment(),
				employeeDto.getYear(),
				employeeDto.getPreferance(),
				employeeDto.getCariculam()
				
		);
	}
	
}