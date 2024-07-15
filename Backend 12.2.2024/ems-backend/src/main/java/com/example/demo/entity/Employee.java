package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "teacher")
public class Employee {
	@Id
	private long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "number",nullable = false, unique = true)
	private String contactNumber ;

	@Column(name = "email",nullable = false, unique = true)
	private String email;
	
	@Column(name = "password",nullable = false)
	private String password;
	
	@Column(name = "adress")
	private String address;
	
	@Column(name = "area")
	private String area;
	
	@Column(name = "institution")
	private String institution;
	
	@Column(name = "department")
	private String department;
	
	@Column(name = "hsc")
	private String year;
	
	@Column(name = "preferance")
	private String preferance;
	
	@Column(name = "cariculam")
	private String cariculam;
}
