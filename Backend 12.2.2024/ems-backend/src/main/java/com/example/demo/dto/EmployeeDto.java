package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    private long id;
	private String name;
	private String gender;
	private String contactNumber;
	private String email;
	private String password;
	private String address;
	private String area;
	private String institution;
	private String department;
	private String year;
	private String preferance;
	private String cariculam;
}
